// SPDX-License-Identifier: Personal
pragma solidity 0.5.16;

import "../coffeecore/Ownable.sol";

import "../coffeeaccesscontrol/ConsumerRole.sol";
import "../coffeeaccesscontrol/DistributorRole.sol";
import "../coffeeaccesscontrol/FarmerRole.sol";
import "../coffeeaccesscontrol/RetailerRole.sol";

// Define a contract 'Supplychain'
contract SupplyChain is
    Ownable,
    ConsumerRole,
    DistributorRole,
    FarmerRole,
    RetailerRole
{
    // Define 'owner'
    // address payable owner;

    // Define a variable called 'upc' for Universal Product Code (UPC)
    uint256 upc;

    // Define a variable called 'sku' for Stock Keeping Unit (SKU)
    uint256 sku;

    // Define a public mapping 'items' that maps the UPC to an Item.
    mapping(uint256 => Item) items;

    // Define a public mapping 'itemsHistory' that maps the UPC to an array of TxHash,
    // that track its journey through the supply chain -- to be sent from DApp.
    mapping(uint256 => string[]) itemsHistory;

    // Define enum 'State' with the following values:
    enum State {
        Started, // 0
        Harvested, // 1
        Processed, // 2
        Packed, // 3
        ForSale, // 4
        Sold, // 5
        Shipped, // 6
        Received, // 7
        Purchased // 8
    }

    State constant defaultState = State.Harvested;

    // Define a struct 'Item' with the following fields:
    struct Item {
        uint256 sku; // Stock Keeping Unit (SKU)
        uint256 upc; // Universal Product Code (UPC), generated by the Farmer, goes on the package, can be verified by the Consumer
        address payable ownerID; // Metamask-Ethereum address of the current owner as the product moves through 8 stages
        address payable originFarmerID; // Metamask-Ethereum address of the Farmer
        string originFarmName; // Farmer Name
        string originFarmInformation; // Farmer Information
        string originFarmLatitude; // Farm Latitude
        string originFarmLongitude; // Farm Longitude
        uint256 productID; // Product ID potentially a combination of upc + sku
        string productNotes; // Product Notes
        uint256 productPrice; // Product Price
        State itemState; // Product State as represented in the enum above
        address payable distributorID; // Metamask-Ethereum address of the Distributor
        address payable retailerID; // Metamask-Ethereum address of the Retailer
        address payable consumerID; // Metamask-Ethereum address of the Consumer
    }

    // Define 9 events with the same 9 state values and accept 'upc' as input argument
    // event Started(uint256 upc);
    event Harvested(uint256 upc);
    event Processed(uint256 upc);
    event Packed(uint256 upc);
    event ForSale(uint256 upc);
    event Sold(uint256 upc);
    event Shipped(uint256 upc);
    event Received(uint256 upc);
    event Purchased(uint256 upc);

    // Define a modifer that checks to see if msg.sender == owner of the contract
    // modifier onlyOwner() {
    //     require(msg.sender == owner, "Only the owner can perform this action.");
    //     _;
    // }

    // Define a modifer that verifies the Caller
    modifier verifyCaller(address _address) {
        require(
            msg.sender == _address,
            "Only the caller can perform this action"
        );
        _;
    }

    // Define a modifier that checks if the paid amount is sufficient to cover the price
    modifier paidEnough(uint256 _price) {
        require(
            msg.value >= _price,
            "Input amount is not sufficient to cover the price"
        );
        _;
    }

    // Define a modifier that checks the price and refunds the remaining balance
    modifier checkValue(uint256 _upc) {
        require(
            items[_upc].productPrice <= msg.value,
            "Input price must be greater than the product price"
        );
        _;
        uint256 _price = items[_upc].productPrice;
        uint256 amountToReturn = msg.value - _price;
        items[_upc].consumerID.transfer(amountToReturn);
    }

    // modifier started(uint256 _upc) {
    //     require(
    //         items[_upc].itemState == State.Started,
    //         "Item is not in the Started state"
    //     );
    //     _;
    // }

    // Define a modifier that checks if an item.state of a upc is Harvested
    modifier harvested(uint256 _upc) {
        require(
            items[_upc].itemState == State.Harvested,
            "Item is not in the Harvested state"
        );
        _;
    }

    // Define a modifier that checks if an item.state of a upc is Processed
    modifier processed(uint256 _upc) {
        require(
            items[_upc].itemState == State.Processed,
            "Item is not in the Processed state"
        );
        _;
    }

    // Define a modifier that checks if an item.state of a upc is Packed
    modifier packed(uint256 _upc) {
        require(
            items[_upc].itemState == State.Packed,
            "Item is not in the Packed state"
        );
        _;
    }

    // Define a modifier that checks if an item.state of a upc is ForSale
    modifier forSale(uint256 _upc) {
        require(
            items[_upc].itemState == State.ForSale,
            "Item is not in the ForSale state"
        );
        _;
    }

    // Define a modifier that checks if an item.state of a upc is Sold
    modifier sold(uint256 _upc) {
        require(
            items[_upc].itemState == State.Sold,
            "Item is not in the Sold state"
        );
        _;
    }

    // Define a modifier that checks if an item.state of a upc is Shipped
    modifier shipped(uint256 _upc) {
        require(
            items[_upc].itemState == State.Shipped,
            "Item is not in the Shipped state"
        );
        _;
    }

    // Define a modifier that checks if an item.state of a upc is Received
    modifier received(uint256 _upc) {
        require(
            items[_upc].itemState == State.Received,
            "Item is not in the Received state"
        );
        _;
    }

    // Define a modifier that checks if an item.state of a upc is Purchased
    modifier purchased(uint256 _upc) {
        require(
            items[_upc].itemState == State.Purchased,
            "Item is not in the Purchased state"
        );
        _;
    }

    // In the constructor set 'owner' to the address that instantiated the contract
    // and set 'sku' to 1
    // and set 'upc' to 1
    constructor() public payable {
        transferOwnership(msg.sender);
        sku = 1;
        upc = 1;
    }

    // Define a function 'kill' if required
    function kill() public {
        renounceOwnership();
    }

    // Define a function 'harvestItem' that allows a farmer to mark an item 'Harvested'
    function harvestItem(
        uint256 _sku,
        uint256 _upc,
        address payable _originFarmerID,
        string memory _originFarmName,
        string memory _originFarmInformation,
        string memory _originFarmLatitude,
        string memory _originFarmLongitude,
        string memory _productNotes
    ) public onlyFarmer {
        sku = _sku;
        upc = _upc;

        // Add the new item as part of Harvest
        Item memory item = Item(
            _sku,
            _upc,
            msg.sender,
            _originFarmerID,
            _originFarmName,
            _originFarmInformation,
            _originFarmLatitude,
            _originFarmLongitude,
            upc + sku, // product ID
            _productNotes,
            0,
            defaultState,
            address(0),
            address(0),
            address(0)
        );

        items[_upc] = item;

        addFarmer(_originFarmerID);

        // Increment sku
        sku++;
        // Emit the appropriate event
        emit Harvested(_upc);
    }

    // Define a function 'processtItem' that allows a farmer to mark an item 'Processed'

    // Call modifier to check if upc has passed previous supply chain stage
    // Call modifier to verify caller of this function
    function processItem(uint256 _upc)
        public
        onlyFarmer
        harvested(_upc)
        verifyCaller(items[_upc].originFarmerID)
    {
        // Update the appropriate fields
        items[_upc].itemState = State.Processed;
        // Emit the appropriate event
        emit Processed(_upc);
    }

    // Define a function 'packItem' that allows a farmer to mark an item 'Packed'

    // Call modifier to check if upc has passed previous supply chain stage
    // Call modifier to verify caller of this function
    function packItem(uint256 _upc)
        public
        onlyFarmer
        processed(_upc)
        verifyCaller(items[_upc].originFarmerID)
    {
        // Update the appropriate fields
        items[_upc].itemState = State.Packed;
        // Emit the appropriate event
        emit Packed(_upc);
    }

    // Define a function 'sellItem' that allows a farmer to mark an item 'ForSale'

    // Call modifier to check if upc has passed previous supply chain stage
    // Call modifier to verify caller of this function
    function sellItem(uint256 _upc, uint256 _price)
        public
        onlyFarmer
        packed(_upc)
        verifyCaller(items[_upc].originFarmerID)
    {
        // Update the appropriate fields
        items[_upc].itemState = State.ForSale;
        items[_upc].productPrice = _price;

        // Emit the appropriate event
        emit ForSale(_upc);
    }

    // Define a function 'buyItem' that allows the disributor to mark an item 'Sold'
    // Use the above defined modifiers to check if the item is available for sale, if the buyer has paid enough,
    // and any excess ether sent is refunded back to the buyer

    // Call modifier to check if upc has passed previous supply chain stage
    // Call modifer to check if buyer has paid enough
    // Call modifer to send any excess ether back to buyer
    function buyItem(uint256 _upc)
        public
        payable
        onlyDistributor
        forSale(_upc)
        paidEnough(msg.value)
        checkValue(_upc)
    {
        // Update the appropriate fields - ownerID, distributorID, itemState
        items[_upc].ownerID = msg.sender;
        items[_upc].distributorID = msg.sender;
        items[_upc].itemState = State.Sold;

        // Transfer money to farmer
        items[_upc].ownerID.transfer(msg.value);

        // addDistributor(msg.sender);

        // emit the appropriate event
        emit Sold(_upc);
    }

    // Define a function 'shipItem' that allows the distributor to mark an item 'Shipped'
    // Use the above modifers to check if the item is sold

    // Call modifier to check if upc has passed previous supply chain stage
    // Call modifier to verify caller of this function
    function shipItem(uint256 _upc)
        public
        onlyDistributor
        sold(_upc)
        verifyCaller(items[_upc].distributorID)
    {
        // Update the appropriate fields
        items[_upc].itemState = State.Shipped;

        // Emit the appropriate event
        emit Shipped(_upc);
    }

    // Define a function 'receiveItem' that allows the retailer to mark an item 'Received'
    // Use the above modifiers to check if the item is shipped

    // Call modifier to check if upc has passed previous supply chain stage
    // Access Control List enforced by calling Smart Contract / DApp
    function receiveItem(uint256 _upc) public onlyRetailer shipped(_upc) {
        // Update the appropriate fields - ownerID, retailerID, itemState
        items[_upc].ownerID = msg.sender;
        items[_upc].retailerID = msg.sender;
        items[_upc].itemState = State.Received;

        // addRetailer(items[_upc].retailerID);

        // Emit the appropriate event
        emit Received(_upc);
    }

    // Define a function 'purchaseItem' that allows the consumer to mark an item 'Purchased'
    // Use the above modifiers to check if the item is received

    // Call modifier to check if upc has passed previous supply chain stage
    // Access Control List enforced by calling Smart Contract / DApp
    function purchaseItem(uint256 _upc) public onlyConsumer received(_upc) {
        // Update the appropriate fields - ownerID, consumerID, itemState
        items[_upc].ownerID = msg.sender;
        items[_upc].consumerID = msg.sender;
        items[_upc].itemState = State.Purchased;

        // addConsumer(msg.sender);

        // Emit the appropriate event
        emit Purchased(_upc);
    }

    // Define a function 'fetchItemBufferOne' that fetches the data
    function fetchItemBufferOne(uint256 _upc)
        public
        view
        returns (
            uint256 itemSKU,
            uint256 itemUPC,
            address payable ownerID,
            address payable originFarmerID,
            string memory originFarmName,
            string memory originFarmInformation,
            string memory originFarmLatitude,
            string memory originFarmLongitude
        )
    {
        // Assign values to the 8 parameters
        itemSKU = items[_upc].sku;
        itemUPC = items[_upc].upc;
        ownerID = items[_upc].ownerID;
        originFarmerID = items[_upc].originFarmerID;
        originFarmName = items[_upc].originFarmName;
        originFarmInformation = items[_upc].originFarmInformation;
        originFarmLatitude = items[_upc].originFarmLatitude;
        originFarmLongitude = items[_upc].originFarmLongitude;

        return (
            itemSKU,
            itemUPC,
            ownerID,
            originFarmerID,
            originFarmName,
            originFarmInformation,
            originFarmLatitude,
            originFarmLongitude
        );
    }

    // Define a function 'fetchItemBufferTwo' that fetches the data
    function fetchItemBufferTwo(uint256 _upc)
        public
        view
        returns (
            uint256 itemSKU,
            uint256 itemUPC,
            uint256 productID,
            string memory productNotes,
            uint256 productPrice,
            State itemState,
            address distributorID,
            address retailerID,
            address consumerID
        )
    {
        // Assign values to the 9 parameters
        itemSKU = items[_upc].sku;
        itemUPC = items[_upc].upc;
        productID = items[_upc].productID;
        productNotes = items[_upc].productNotes;
        productPrice = items[_upc].productPrice;
        itemState = items[_upc].itemState;
        distributorID = items[_upc].distributorID;
        retailerID = items[_upc].retailerID;
        consumerID = items[_upc].consumerID;

        return (
            itemSKU,
            itemUPC,
            productID,
            productNotes,
            productPrice,
            itemState,
            distributorID,
            retailerID,
            consumerID
        );
    }
}
