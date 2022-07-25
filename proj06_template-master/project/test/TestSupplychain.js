const truffleAssert = require('truffle-assertions');

// This script is designed to test the solidity smart contract - SuppyChain.sol -- and the various functions within
// Declare a variable and assign the compiled smart contract artifact
var SupplyChain = artifacts.require('SupplyChain')

contract('SupplyChain', function(accounts) {
    // Declare few constants and assign a few sample accounts generated by ganache-cli
    var sku = 2
    var upc = 2
    const ownerID = accounts[0]
    const originFarmerID = accounts[1]
    const originFarmName = "Nguyen Nam"
    const originFarmInformation = "Vietnam, Ho Chi Minh City"
    const originFarmLatitude = "10.82302"
    const originFarmLongitude = "106.62965"
    var productID = sku  + "-" + upc
    const productNotes = `
        Coffee G7 from Vietnam.
        Really dilicious, great smell.
        https://www.amazon.co.jp/dp/B07QHJP9T2/ref=sspa_dk_detail_0?psc=1&pd_rd_i=B07QHJP9T2&pd_rd_w=g8nX3&content-id=amzn1.sym.f293be60-50b7-49bc-95e8-931faf86ed1e&pf_rd_p=f293be60-50b7-49bc-95e8-931faf86ed1e&pf_rd_r=NEB53N8QEC37X5KK68SD&pd_rd_wg=WCp8h&pd_rd_r=b1c5b9d9-97b5-4133-8881-d15553332982&s=food-beverage&smid=A1MCH0KODX6AF6&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEyVDE2NVQ4NVJTVk5IJmVuY3J5cHRlZElkPUEwMjk2NDQyMVc0Q1hKTkVRS0NOWiZlbmNyeXB0ZWRBZElkPUEzQjBEWTJJNE1SMFIwJndpZGdldE5hbWU9c3BfZGV0YWlsJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ==
    `
    // const productPrice = web3.utils.toWei("0.0001", "ether") // 0.0001 ether = 100,000,000,000,000 Wei
    const productPrice = 100000000000000 // 0.0001 ether
    const ITEM_STATE = {
        "START": 0,
        "HARVEST": 1,
        "PROCESSED": 2,
        "PACKED": 3,
        "FORSALE": 4,
        "SOLD": 5,
        "SHIPPED": 6,
        "RECEIVED": 7,
        "PURCHASED": 8,
    }
    const distributorID = accounts[2]
    const retailerID = accounts[3]
    const consumerID = accounts[4]
    const emptyAddress = '0x00000000000000000000000000000000000000'

    ///Available Accounts
    ///==================
    ///(0) 0x4ffAFDF5E60304f22ec3d6BD704fC37a372DAc92
    ///(1) 0x5eD5ef93a2DBc62eb8f73b2171d15d0eBd6aCd95
    ///(2) 0x661B2B02f88e003449bC2e36554d8B45e0f81591
    ///(3) 0x92B2bb275cbB5b19B2896B939eC7531357616D9A
    ///(4) 0x8EDa428484011a8385C356A31A38C1A675508303
    ///(5) 0x08fed19C6Ce648be105a91c83dEef9b6dE71415C
    ///(6) 0x1621B2c42EA582af127AB834D7C7A3bdf6eaF9b1
    ///(7) 0x477383F21df9a405bdA13d860aabD78323f7eB95
    ///(8) 0xf103576efffF95223E516F707b4f59B6343Ed1E1
    ///(9) 0x748Fc7757A628642d07F346B83F784d72BD3855b

    console.log("ganache-cli accounts used here...")
    console.log("Contract Owner: accounts[0] ", ownerID)
    console.log("Farmer: accounts[1] ", originFarmerID)
    console.log("Distributor: accounts[2] ", distributorID)
    console.log("Retailer: accounts[3] ", retailerID)
    console.log("Consumer: accounts[4] ", consumerID)
    console.log("productID ", productID)
    console.log("productPrice ", parseInt(productPrice).toLocaleString('en-US'), "wei")

    let supplyChain = null;

    before('setup contract', async() => {
      // Initialize Config
        supplyChain = await SupplyChain.deployed({from: ownerID})

        //add farmer
        await supplyChain.addFarmer(originFarmerID)
        await supplyChain.addFarmer(ownerID)

        // // Monitor Events
        // supplyChain.ForSale({}, (error, result) => {
        //     if(error) console.error(error);
        //     console.log(`[ForSale] => [message] : ${result.args.message} [status] : ${result.args.status}`);
        // });
    })

    // async function beforeAll(){
    //     //add farmer
    //     await supplyChain.addFarmer(originFarmerID)
    //     await supplyChain.addFarmer(ownerID)
    // }

    // 1st Test
    it("Testing smart contract function harvestItem() that allows a farmer to harvest coffee", async() => {
        // let supplyChain = await SupplyChain.deployed()
        
        // Declare and Initialize a variable for event
        let eventEmitted = false
        
        // Watch the emitted event Harvested()
        await supplyChain.Harvested(null, (error, event)=>{
            eventEmitted = true;
        })

        // Mark an item as Harvested by calling function harvestItem()
        await supplyChain.harvestItem(sku, upc, originFarmerID, originFarmName, originFarmInformation, originFarmLatitude, originFarmLongitude, productNotes, {from: ownerID})

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[2], ownerID, 'Error: Missing or Invalid ownerID')
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID')
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName')
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation')
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude')
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude')
        assert.equal(resultBufferTwo[5], ITEM_STATE.HARVEST, 'Error: Invalid item State')
        assert.equal(true, eventEmitted, 'Invalid event emitted')
    })

    // 2nd Test
    it("Testing smart contract function processItem() that allows a farmer to process coffee", async() => {
        // let supplyChain = await SupplyChain.deployed()
        
        // Declare and Initialize a variable for event
        let eventEmitted = false
        
        // Watch the emitted event Processed()
        await supplyChain.Processed(null, (error, event)=>{
            eventEmitted = true;
        })

        // Mark an item as Processed by calling function processItem()
        await supplyChain.processItem(upc, {from: originFarmerID})

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[2], ownerID, 'Error: Missing or Invalid ownerID')
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID')
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName')
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation')
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude')
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude')
        assert.equal(resultBufferTwo[5], ITEM_STATE.PROCESSED, 'Error: Invalid item State')
        assert.equal(true, eventEmitted, 'Invalid event emitted')
        
    })

    // 3rd Test
    it("Testing smart contract function packItem() that allows a farmer to pack coffee", async() => {
        // let supplyChain = await SupplyChain.deployed()
        
        // Declare and Initialize a variable for event
        let eventEmitted = false
        
        
        // Watch the emitted event Packed()
        await supplyChain.Packed(null, (error, event)=>{
            eventEmitted = true;
        })

        // Mark an item as Packed by calling function packItem()
        await supplyChain.packItem(upc, {from: originFarmerID})

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[2], ownerID, 'Error: Missing or Invalid ownerID')
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID')
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName')
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation')
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude')
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude')
        assert.equal(resultBufferTwo[5], ITEM_STATE.PACKED, 'Error: Invalid item State')
        assert.equal(true, eventEmitted, 'Invalid event emitted')
    })

    // 4th Test
    it("Testing smart contract function sellItem() that allows a farmer to sell coffee", async() => {
        // let supplyChain = await SupplyChain.deployed()
        
        // Declare and Initialize a variable for event
        let eventEmitted = false

        // Watch the emitted event ForSale()
        await supplyChain.ForSale(null, (error, event)=>{
            eventEmitted = true;
            // console.error("========")
            // console.error({emit: "ForSale", error})
            // console.error({emit: "ForSale", event})
            // console.error("========")
        })

        // Mark an item as ForSale by calling function sellItem()
        await supplyChain.sellItem(upc, productPrice, {from: originFarmerID})

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[2], ownerID, 'Error: Missing or Invalid ownerID')
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID')
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName')
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation')
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude')
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude')
        assert.equal(resultBufferTwo[5], ITEM_STATE.FORSALE, 'Error: Invalid item State')
        assert.equal(true, eventEmitted, 'Invalid event emitted')

    })

    // 5th Test
    it("Testing smart contract function buyItem() that allows a distributor to buy coffee", async() => {
        // let supplyChain = await SupplyChain.deployed()

        // Declare and Initialize a variable for event
        let eventEmitted = false

        // Watch the emitted event Sold()
        await supplyChain.Sold(null, (error, event)=>{
            eventEmitted = true;
            // console.error("========")
            // console.error({buyItem: "buyItem", error})
            // console.error("========")
        })

        // add distributor to the list of distributors
        await supplyChain.addDistributor(distributorID)

        // Mark an item as Sold by calling function buyItem()
        await supplyChain.buyItem(upc, {from: distributorID, value: productPrice})

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[2], distributorID, 'Error: Missing or Invalid ownerID')
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID')
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName')
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation')
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude')
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude')
        assert.equal(resultBufferTwo[5], ITEM_STATE.SOLD, 'Error: Invalid item State')
        assert.equal(true, eventEmitted, 'Invalid event emitted')

    })

    // 6th Test
    it("Testing smart contract function shipItem() that allows a distributor to ship coffee", async() => {
        // let supplyChain = await SupplyChain.deployed()
        
        // Declare and Initialize a variable for event
        let eventEmitted = false

        // Watch the emitted event Shipped()
        await supplyChain.Shipped(null, (error, event)=>{
            eventEmitted = true;
        })

        // Mark an item as Sold by calling function shipItem()
        await supplyChain.shipItem(upc, {from: distributorID})

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[2], distributorID, 'Error: Missing or Invalid ownerID')
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID')
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName')
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation')
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude')
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude')
        assert.equal(resultBufferTwo[5], ITEM_STATE.SHIPPED, 'Error: Invalid item State')
        assert.equal(true, eventEmitted, 'Invalid event emitted')

    })

    // 7th Test
    it("Testing smart contract function receiveItem() that allows a retailer to mark coffee received", async() => {
        // let supplyChain = await SupplyChain.deployed()
        
        // Declare and Initialize a variable for event
        let eventEmitted = false
        
        
        // Watch the emitted event Received()
        await supplyChain.Received(null, (error, event)=>{
            eventEmitted = true;
        })

        // add retailer to the list of retailers
        await supplyChain.addRetailer(retailerID)

        // Mark an item as Sold by calling function receiveItem()
        await supplyChain.receiveItem(upc, {from: retailerID})

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[2], retailerID, 'Error: Missing or Invalid ownerID')
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID')
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName')
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation')
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude')
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude')
        assert.equal(resultBufferTwo[5], ITEM_STATE.RECEIVED, 'Error: Invalid item State')
        assert.equal(true, eventEmitted, 'Invalid event emitted')

    })

    // 8th Test
    it("Testing smart contract function purchaseItem() that allows a consumer to purchase coffee", async() => {
        // let supplyChain = await SupplyChain.deployed()

        // Declare and Initialize a variable for event
        let eventEmitted = false

        // Watch the emitted event Purchased()
        await supplyChain.Purchased(null, (error, event)=>{
            eventEmitted = true;
        })
        
        // add consumer to the list of consumers
        await supplyChain.addConsumer(consumerID)

        // Mark an item as Sold by calling function purchaseItem()
        await supplyChain.purchaseItem(upc, {from: consumerID})

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[2], consumerID, 'Error: Missing or Invalid ownerID')
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID')
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName')
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation')
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude')
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude')
        assert.equal(resultBufferTwo[5], ITEM_STATE.PURCHASED, 'Error: Invalid item State')
        assert.equal(true, eventEmitted, 'Invalid event emitted')
    })

    // // 9th Test
    // it("Testing smart contract function fetchItemBufferOne() that allows anyone to fetch item details from blockchain", async() => {
    //     // let supplyChain = await SupplyChain.deployed()

    //     // Retrieve the just now saved item from blockchain by calling function fetchItem()
    //     const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
    //     // const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)

    //     // Verify the result set
    //     assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
    //     assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
    //     assert.equal(resultBufferOne[2], ownerID, 'Error: Missing or Invalid ownerID')
    //     assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID')
    //     assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName')
    //     assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation')
    //     assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude')
    //     assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude')
    //     assert.equal(resultBufferTwo[5], 0, 'Error: Invalid item State')
    //     assert.equal(true, eventEmitted, 'Invalid event emitted')

    // })

    // // 10th Test
    // it("Testing smart contract function fetchItemBufferTwo() that allows anyone to fetch item details from blockchain", async() => {
    //     // let supplyChain = await SupplyChain.deployed()

    //     // Retrieve the just now saved item from blockchain by calling function fetchItem()
    //     // const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
    //     const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)

    //     // Verify the result set
    //     assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
    //     assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
    //     assert.equal(resultBufferOne[2], ownerID, 'Error: Missing or Invalid ownerID')
    //     assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID')
    //     assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName')
    //     assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation')
    //     assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude')
    //     assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude')
    //     assert.equal(resultBufferTwo[5], 0, 'Error: Invalid item State')
    //     assert.equal(true, eventEmitted, 'Invalid event emitted')

    // })

});

