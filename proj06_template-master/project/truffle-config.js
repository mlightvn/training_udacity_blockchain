require('dotenv').config();
// require('dotenv-expand')(require('dotenv').config());

const HDWalletProvider = require('truffle-hdwallet-provider');

// console.log({env: process.env});
// console.log({ETH_SEED_PHRASE: process.env.ETH_SEED_PHRASE});
// console.log({ETH_LOCAL_SEED_PHRASE: process.env.ETH_LOCAL_SEED_PHRASE});
// console.log({ENDPOINT: process.env.ENDPOINT});
// console.log({ENDPOINT_WS: process.env.ENDPOINT_WS});


module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",
            port: 7545,
            network_id: "*",
            websockets: true,
        },

        rinkeby: {
            networkCheckTimeout: 10000, // ms
            provider: () => new HDWalletProvider(
                process.env.ETH_LOCAL_SEED_PHRASE,
                process.env.ENDPOINT,
            ),
            gas: 5000000,
            gasPrice: 25000000000,
            network_id: "*",
            confirmations: 1,
        },
    },

    // contracts_directory: './src/contracts/',
    // contracts_build_directory: './src/abis/',

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
