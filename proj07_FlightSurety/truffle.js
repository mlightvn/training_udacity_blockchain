// GET_PASSES_THIS_REPO_UDACITY_PLEASE
require('dotenv').config();

// var NonceTrackerSubprovider = require("web3-provider-engine/subproviders/nonce-tracker")
let HDWalletProvider = require("truffle-hdwallet-provider");
// const mnemonic = "snow wrap eagle suffer animal animal machine bacon eager clock walnut labor";
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
    //   gas: 5000000,
    //   // gasPrice: 25000000000,
    //   websockets: true,
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
    // rinkeby: {
    //   provider: function () {
    //     var wallet = new HDWalletProvider(
    //       mnemonic,
    //       process.env.ENDPOINT_LOCAL,
    //       0,
    //       50
    //     );
    //     var nonceTracker = new NonceTrackerSubprovider();
    //     wallet.engine._providers.unshift(nonceTracker);
    //     nonceTracker.setEngine(wallet.engine);
    //     return wallet;
    //   },
    // },
  },

  // contracts_directory: './src/contracts/',
  // contracts_build_directory: './src/abis/',

  compilers: {
    solc: {
      version: "0.8.15"
    }
  }
};