module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    }
  },

  // Configure your compilers
  compilers: {
    solc: {
      // version: "0.8.6",    // Fetch exact version from solc-bin (default: truffle's version)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: true,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  }
};