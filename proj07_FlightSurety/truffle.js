// GET_PASSES_THIS_REPO_UDACITY_PLEASE
require('dotenv').config();

// GET_PASSES_THIS_REPO_UDACITY_PLEASE
var HDWalletProvider = require("truffle-hdwallet-provider");
// var mnemonic = "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat";
const mnemonic = process.env.ETH_LOCAL_SEED_PHRASE

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
      websockets: true,
    },

    // development: {
    //   provider: function() {
    //     return new HDWalletProvider(mnemonic, process.env.ENDPOINT_LOCAL, 0, 50);
    //   },
    //   network_id: '*',
    //   gas: 9999999
    // },

    rinkeby: {
      networkCheckTimeout: 10000, // ms
      provider: () => new HDWalletProvider(
          process.env.ETH_PRODUCTION_SEED_PHRASE,
          process.env.ENDPOINT_PRODUCTION,
      ),
      gas: 5000000,
      // gasPrice: 25000000000,
      network_id: "*",
      confirmations: 0,
    },
  },
  compilers: {
    solc: {
      version: "^0.4.24"
    }
  }
};