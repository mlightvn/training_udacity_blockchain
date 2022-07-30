require('dotenv').config();

let HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = "snow wrap eagle suffer animal animal machine bacon eager clock walnut labor";

module.exports = {
  networks: {
    development: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "http://127.0.0.1:7545/", 0, 50);
      },
      network_id: '*',
      gas: 5000000,
      // gasPrice: 25000000000,
      websockets: true,
    },

    rinkeby: {
      networkCheckTimeout: 10000, // ms
      provider: () => new HDWalletProvider(
          process.env.ETH_LOCAL_SEED_PHRASE,
          process.env.ENDPOINT,
      ),
      gas: 5000000,
      // gasPrice: 25000000000,
      network_id: "*",
      confirmations: 0,
    },
  },

  // contracts_directory: './src/contracts/',
  // contracts_build_directory: './src/abis/',

  compilers: {
    solc: {
      // version: "^0.4.24"
    }
  }
};