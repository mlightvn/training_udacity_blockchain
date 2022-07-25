App = {
    web3: null,
    web3Provider: null,
    contracts: {},
    emptyAddress: "0x0000000000000000000000000000000000000000",
    sku: 0,
    upc: 0,
    metamaskAccountID: "0x0000000000000000000000000000000000000000",
    ownerID: "0x0000000000000000000000000000000000000000",
    originFarmerID: "0x0000000000000000000000000000000000000000",
    originFarmName: null,
    originFarmInformation: null,
    originFarmLatitude: null,
    originFarmLongitude: null,
    productNotes: null,
    productPrice: 0,
    distributorID: "0x0000000000000000000000000000000000000000",
    retailerID: "0x0000000000000000000000000000000000000000",
    consumerID: "0x0000000000000000000000000000000000000000",
    state: 0,

    init: async function () {
        App.readForm();
        /// Setup access to blockchain
        return await App.initWeb3();
    },

    readForm: function () {
        App.sku = $("#sku").val();
        App.upc = $("#upc").val();
        App.ownerID = $("#ownerID").val();
        App.originFarmerID = $("#originFarmerID").val();
        App.originFarmName = $("#originFarmName").val();
        App.originFarmInformation = $("#originFarmInformation").val();
        App.originFarmLatitude = $("#originFarmLatitude").val();
        App.originFarmLongitude = $("#originFarmLongitude").val();
        App.productNotes = $("#productNotes").val();
        App.productPrice = $("#productPrice").val();
        App.distributorID = $("#distributorID").val();
        App.retailerID = $("#retailerID").val();
        App.consumerID = $("#consumerID").val();

        console.log({
            sku: App.sku,
            upc: App.upc,
            ownerID: App.ownerID, 
            originFarmerID: App.originFarmerID, 
            originFarmName: App.originFarmName, 
            originFarmInformation: App.originFarmInformation, 
            originFarmLatitude: App.originFarmLatitude, 
            originFarmLongitude: App.originFarmLongitude, 
            productNotes: App.productNotes, 
            productPrice: App.productPrice, 
            distributorID: App.distributorID, 
            retailerID: App.retailerID, 
            consumerID: App.consumerID,
        });
    },

    initWeb3: async function () {
        // Find or Inject Web3 Provider
        // Modern dapp browsers...
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
                // Request account access
                await window.ethereum.enable();
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else 
        {
            App.web3Provider = new Web3.providers.HttpProvider(configuration.web3Provider.endpoint_ws);
        }

        // App.web3Provider = new Web3(Web3.givenProvider || new Web3.providers.WebsocketProvider(configuration.web3Provider.endpoint_ws));
        console.log({endpoint_ws: configuration.web3Provider.endpoint_ws})

        App.getMetaMaskAccountID();

        return App.initSupplyChain();
    },

    getMetaMaskAccountID: function () {
        App.web3 = new Web3(App.web3Provider);

        // Retrieving accounts
        App.web3.eth.getAccounts(function(err, res) {
            if (err) {
                console.log('Error:',err);
                return;
            }
            console.log('getMetaMaskID:',res);
            App.metamaskAccountID = res[0];

        })
    },

    initSupplyChain: function () {
        /// Source the truffle compiled smart contracts
        let jsonSupplyChain='../../build/contracts/SupplyChain.json';

        /// JSONfy the smart contracts
        $.getJSON(jsonSupplyChain, function(data) {
            // console.log('contract', data);
            let SupplyChainArtifact = data;
            App.contracts.SupplyChain = TruffleContract(SupplyChainArtifact);
            App.contracts.SupplyChain.setProvider(App.web3Provider);

            App.fetchItemBufferOne();
            App.fetchItemBufferTwo();
            App.fetchEvents();

        });

        return App.bindEvents();
    },

    bindEvents: function() {
        $(document).on('click', App.handleButtonClick);
    },

    handleButtonClick: async function(event) {
        event.preventDefault();

        App.getMetaMaskAccountID();

        let processId = parseInt($(event.target).data('id'));
        console.log('processId',processId);

        switch(processId) {
            case 0:
                return await App.reset(event);
                break;
            case 1:
                return await App.harvestItem(event);
                break;
            case 2:
                return await App.processItem(event);
                break;
            case 3:
                return await App.packItem(event);
                break;
            case 4:
                return await App.sellItem(event);
                break;
            case 5:
                return await App.buyItem(event);
                break;
            case 6:
                return await App.shipItem(event);
                break;
            case 7:
                return await App.receiveItem(event);
                break;
            case 8:
                return await App.purchaseItem(event);
                break;
            case 9:
                return await App.fetchItemBufferOne(event);
                break;
            case 10:
                return await App.fetchItemBufferTwo(event);
                break;
            case 11:
                return await App.fetchEvents(event);
                break;
            case 12:
                return await App.addDistributor(event);
            case 13:
                return await App.addRetailer(event);
            case 14:
                return await App.addConsumer(event);
            case 15:
                return await App.addFarmer(event);
        }
    },

    reset: function(event) {
        event.preventDefault();

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.reset(
                App.upc,
                {from: App.metamaskAccountID},
            );
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('reset',result);
        }).catch(function(err) {
            console.error(err.message);
        });
    },

    harvestItem: function(event) {
        event.preventDefault();

        // $("button[data-id=1]").prop("disabled", true);
        // $("button[data-id=2]").prop("disabled", false);
        // return

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.harvestItem(
                App.sku,
                App.upc,
                App.originFarmerID,
                App.originFarmName,
                App.originFarmInformation,
                App.originFarmLatitude,
                App.originFarmLongitude,
                App.productNotes,
                {from: App.metamaskAccountID},
            );
        }).then(function(result) {
            $("button[data-id=1]").prop("disabled", true);
            $("button[data-id=2]").prop("disabled", false);

            // $("#ftc-item").text(result);
            console.log('harvestItem',result);
        }).catch(function(err) {
            console.log('harvestItem error =========================== <<<');
            console.error(err.message);
            console.log('harvestItem error =========================== >>>');
        });
    },

    processItem: function (event) {
        event.preventDefault();

        // $("button[data-id=2]").prop("disabled", true);
        // $("button[data-id=3]").prop("disabled", false);
        // return

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.processItem(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("button[data-id=2]").prop("disabled", true);
            $("button[data-id=3]").prop("disabled", false);

            // $("#ftc-item").text(result);
            console.log('processItem',result);
        }).catch(function(err) {
            console.log('processItem error =========================== <<<');
            console.error(err.message);
            console.log('processItem error =========================== >>>');
        });
    },

    packItem: function (event) {
        event.preventDefault();

        // $("button[data-id=3]").prop("disabled", true);
        // $("button[data-id=4]").prop("disabled", false);
        // return

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.packItem(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("button[data-id=3]").prop("disabled", true);
            $("button[data-id=4]").prop("disabled", false);

            // $("#ftc-item").text(result);
            console.log('packItem',result);
        }).catch(function(err) {
            console.log('packItem error =========================== <<<');
            console.error(err.message);
            console.log('packItem error =========================== >>>');
        });
    },

    sellItem: function (event) {
        event.preventDefault();

        // $("button[data-id=4]").prop("disabled", true);
        // $("button[data-id=5]").prop("disabled", false);
        // $("#distributorID").prop("disabled", false);
        // return

        App.contracts.SupplyChain.deployed().then(function(instance) {
            // let productPrice = App.web3.toWei("" + App.productPrice, "ether");
            console.log('productPrice',App.productPrice);
            return instance.sellItem(App.upc, App.productPrice, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("button[data-id=4]").prop("disabled", true);
            $("button[data-id=5]").prop("disabled", false);
            $("#distributorID").prop("disabled", false);

            // $("#ftc-item").text(result);
            console.log('sellItem',result);
        }).catch(function(err) {
            console.log('sellItem error =========================== <<<');
            console.error(err.message);
            console.log('sellItem error =========================== >>>');
        });
    },

    buyItem: function (event) {
        event.preventDefault();

        // $("button[data-id=5]").prop("disabled", true);
        // $("button[data-id=6]").prop("disabled", false);
        // return

        App.contracts.SupplyChain.deployed().then(function(instance) {
            // let buyPrice = App.productPrice;
            // const walletValue = web3.utils.toWei("" + buyPrice, "ether");
            // console.log({productPrice: App.productPrice, buyPrice: (parseFloat(App.productPrice) + 0.03),walletValue});

            return instance.buyItem(App.upc, {from: App.distributorID, value: App.productPrice});
        }).then(function(result) {
            $("button[data-id=5]").prop("disabled", true);
            $("button[data-id=6]").prop("disabled", false);

            // $("#ftc-item").text(result);
            console.log('buyItem',result);
        }).catch(function(err) {
            console.log('buyItem error =========================== <<<');
            console.error(err.message);
            console.log('buyItem error =========================== >>>');
        });
    },

    shipItem: function (event) {
        event.preventDefault();

        // $("button[data-id=6]").prop("disabled", true);
        // $("button[data-id=7]").prop("disabled", false);
        // $("#distributorID").prop("disabled", true);
        // $("#retailerID").prop("disabled", false);
        // return

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.shipItem(App.upc, {from: App.distributorID});
        }).then(function(result) {
            $("button[data-id=6]").prop("disabled", true);
            $("button[data-id=7]").prop("disabled", false);
            $("#distributorID").prop("disabled", true);
            $("#retailerID").prop("disabled", false);

            // $("#ftc-item").text(result);
            console.log('shipItem',result);
        }).catch(function(err) {
            console.log('shipItem error =========================== <<<');
            console.error(err.message);
            console.log('shipItem error =========================== >>>');
        });
    },

    receiveItem: function (event) {
        event.preventDefault();

        // $("button[data-id=7]").prop("disabled", true);
        // $("button[data-id=8]").prop("disabled", false);
        // $("#retailerID").prop("disabled", true);
        // $("#consumerID").prop("disabled", false);
        // return

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.receiveItem(App.upc, {from: App.retailerID});
        }).then(function(result) {
            $("button[data-id=7]").prop("disabled", true);
            $("button[data-id=8]").prop("disabled", false);
            $("#retailerID").prop("disabled", true);
            $("#consumerID").prop("disabled", false);

            // $("#ftc-item").text(result);
            console.log('receiveItem',result);
        }).catch(function(err) {
            console.log('receiveItem error =========================== <<<');
            console.error(err.message);
            console.log('receiveItem error =========================== >>>');
        });
    },

    purchaseItem: function (event) {
        event.preventDefault();

        // $("button[data-id=8]").prop("disabled", true);
        // $("button[data-id=9]").prop("disabled", false);
        // $("button[data-id=1]").prop("disabled", false);
        // $("#consumerID").prop("disabled", true);
        // return

        App.contracts.SupplyChain.deployed().then(function(instance) {
            // instance.addConsumer(App.consumerID, {from: App.metamaskAccountID})
            return instance.purchaseItem(App.upc, {from: App.consumerID});
        }).then(function(result) {
            $("button[data-id=8]").prop("disabled", true);
            $("button[data-id=9]").prop("disabled", false);
            $("button[data-id=1]").prop("disabled", false);
            $("#consumerID").prop("disabled", true);

            // $("#ftc-item").text(result);
            console.log('purchaseItem',result);
        }).catch(function(err) {
            console.log('purchaseItem error =========================== <<<');
            console.error(err.message);
            console.log('purchaseItem error =========================== >>>');
        });
    },

    fetchItemBufferOne: function () {
        // event.preventDefault();

        App.contracts.SupplyChain.deployed().then(function(instance) {
          return instance.fetchItemBufferOne(App.upc);
        }).then(function(result) {
        //   $("#ftc-item").text(result);
            $("#ownerID").val(result.ownerID);
            console.log('fetchItemBufferOne', result);
        }).catch(function(err) {
            console.log('fetchItemBufferOne error =========================== <<<');
            console.error(err.message);
            console.log('fetchItemBufferOne error =========================== >>>');
        });
    },

    fetchItemBufferTwo: function () {
        // event.preventDefault();

        App.contracts.SupplyChain.deployed().then(function(instance) {
          return instance.fetchItemBufferTwo.call(App.upc);
        }).then(function(result) {
        //   $("#ftc-item").text(result);
          console.log('fetchItemBufferTwo', result);
          $("#state").val(App.stateLabel(result.itemState.words[0]));
        }).catch(function(err) {
            console.log('fetchItemBufferTwo error =========================== <<<');
            console.error(err.message);
            console.log('fetchItemBufferTwo error =========================== >>>');
        });
    },

    addFarmer: function (event) {
        event.preventDefault();
        console.log("addFarmer");

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.addFarmer(App.originFarmerID, {from: App.metamaskAccountID})
            // return instance.addFarmer(App.metamaskAccountID, {from: App.metamaskAccountID})
        }).then(function(result) {
            console.log('addFarmer',result);
        }).catch(function(err) {
            console.log('addFarmer error =========================== <<<');
            console.error(err.message);
            console.log('addFarmer error =========================== >>>');
        });
    },

    addDistributor: function (event) {
        event.preventDefault();

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.addDistributor(App.distributorID, {from: App.metamaskAccountID})
        }).then(function(result) {
            console.log('addDistributor',result);
        }).catch(function(err) {
            console.log('addDistributor error =========================== <<<');
            console.error(err.message);
            console.log('addDistributor error =========================== >>>');
        });
    },

    addRetailer: function (event) {
        event.preventDefault();

        App.contracts.SupplyChain.deployed().then(function(instance) {
            // return instance.addRetailer(App.metamaskAccountID, {from: App.metamaskAccountID})
            return instance.addRetailer(App.retailerID, {from: App.metamaskAccountID})
        }).then(function(result) {
            console.log('addRetailer',result);
        }).catch(function(err) {
            console.log('addRetailer error =========================== <<<');
            console.error(err.message);
            console.log('addRetailer error =========================== >>>');
        });
    },

    addConsumer: function (event) {
        event.preventDefault();

        App.contracts.SupplyChain.deployed().then(function(instance) {
            // return instance.addConsumer(App.metamaskAccountID, {from: App.metamaskAccountID})
            return instance.addConsumer(App.consumerID, {from: App.metamaskAccountID})
        }).then(function(result) {
            console.log('addConsumer',result);
        }).catch(function(err) {
            console.log('addConsumer error =========================== <<<');
            console.error(err.message);
            console.log('addConsumer error =========================== >>>');
        });
    },

    stateLabel: function (state) {
        if(typeof state != "number"){
            $("button[data-id=1]").prop("disabled", false);
            return 'Unknown';
        }

        App.state = state;

        $("button[data-id]").prop("disabled", true);
        $("button[data-id=9]").prop("disabled", false);
        $("button[data-id=10]").prop("disabled", false);
        $("button[data-id=12]").prop("disabled", false);
        $("button[data-id=13]").prop("disabled", false);
        $("button[data-id=14]").prop("disabled", false);
        $("button[data-id=15]").prop("disabled", false);
        switch (state) {
            case 0:
                $("button[data-id=1]").prop("disabled", false);

                return 'Started';
            case 1:
                $("button[data-id=2]").prop("disabled", false);

                return 'Harvested';
            case 2:
                $("button[data-id=3]").prop("disabled", false);

                return 'Processed';
            case 3:
                $("button[data-id=4]").prop("disabled", false);

                return 'Packed';
            case 4:
                $("button[data-id=5]").prop("disabled", false);
                $("#distributorID").attr("disabled", false);

                return 'ForSales';
            case 5:
                $("button[data-id=6]").prop("disabled", false);
                $("#distributorID").attr("disabled", false);

                return 'Bought';
            case 6:
                $("button[data-id=7]").prop("disabled", false);
                $("#retailerID").attr("disabled", false);

                return 'Shipped';
            case 7:
                $("button[data-id=8]").prop("disabled", false);
                $("#consumerID").attr("disabled", false);

                return 'Received';
            case 8:
                $("button[data-id=1]").prop("disabled", false);

                return 'Purchased';
            default:
                $("button[data-id=2]").prop("disabled", false);

                return 'Unknown';
        }
    },

    fetchEvents: function () {
        if (typeof App.contracts.SupplyChain.currentProvider.sendAsync !== "function") {
            App.contracts.SupplyChain.currentProvider.sendAsync = function () {
                return App.contracts.SupplyChain.currentProvider.send.apply(
                App.contracts.SupplyChain.currentProvider,
                    arguments
              );
            };
        }

        App.contracts.SupplyChain.deployed().then(function(instance) {
            instance.allEvents(function(err, log){
                if (!err){
                    $("#ftc-events").append('<li>' + log.event + ' - ' + log.transactionHash + '</li>');
                }
            });
        }).catch(function(err) {
            console.log('fetchEvents error =========================== <<<');
            console.error(err.message);
            console.log('fetchEvents error =========================== >>>');
        });

    }
};

$(function () {
    $(window).load(function () {
        App.init();
    });
});
