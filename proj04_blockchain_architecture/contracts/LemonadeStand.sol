pragma solidity ^0.5.16;

// https://learn.udacity.com/nanodegrees/nd1309/parts/cd0598/lessons/46eff0f3-6613-41d3-b57e-f12d703b1846/concepts/ad4c181b-e1be-41f9-84d7-731528264551
contract LemonadeStand {
    address owner;
    uint256 skuIndex;

    enum State {
        ForSale,
        Sold,
        Shipped
    }

    struct Item {
        string name;
        uint256 sku;
        uint256 price;
        State state;
        address payable seller;
        address payable buyer;
    }

    mapping(uint256 => Item) items;

    event ForSale(uint256 skuIndex);
    event Sold(uint256 sku);
    event Shipped(uint256 sku);

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier verifyCaller(address _address) {
        require(msg.sender == _address);
        _;
    }

    modifier paidEnough(uint256 _price) {
        require(msg.value >= _price);
        _;
    }

    modifier forSale(uint256 _sku) {
        require(items[_sku].state == State.ForSale);
        _;
    }

    modifier sold(uint256 _sku) {
        require(items[_sku].state == State.Sold);
        _;
    }

    // Define a modifier that checks the price and refunds the remaining balance
    modifier checkValue(uint256 _sku) {
        _;
        uint256 _price = items[_sku].price;
        uint256 amountToRefund = msg.value - _price;
        items[_sku].buyer.transfer(amountToRefund);
    }

    function add(string memory _name, uint256 _price) public onlyOwner {
        skuIndex++;
        emit ForSale(skuIndex);
        items[skuIndex] = Item({
            name: _name,
            sku: skuIndex,
            price: _price,
            state: State.ForSale,
            seller: msg.sender,
            buyer: address(0)
        });
    }

    function buy(uint256 _sku)
        public
        payable
        forSale(_sku)
        paidEnough(items[_sku].price)
        checkValue(sku)
    {
        address payable buyer = msg.sender;
        Item memory item = items[_sku];
        uint256 price = item.price;
        item.buyer = buyer;
        item.state = State.Sold;
        item.seller.transfer(price);

        emit Sold(_sku);
    }

    // Define a function 'shipItem' that allows the seller to change the state to 'Shipped'
    // Call modifier to check if the item is sold
    // Call modifier to check if the invoker is seller
    function shipItem(uint256 sku)
        public
        sold(sku)
        verifyCaller(items[sku].seller)
    {
        // Update state
        items[sku].state = State.Shipped;
        // Emit the appropriate event
        emit Shipped(sku);
    }

    function fetch(uint256 _sku)
        public
        view
        returns (
            string memory name,
            uint256 sku,
            uint256 price,
            string memory stateIs,
            address buyer,
            address seller
        )
    {
        uint256 state;
        Item memory item = items[_sku];
        name = item.name;
        price = item.price;
        sku = item.sku;
        state = uint256(item.state);
        if (state == 0) {
            stateIs = "ForSale";
        } else if (state == 1) {
            stateIs = "Sold";
        }
        seller = item.seller;
        buyer = item.buyer;
    }
}
