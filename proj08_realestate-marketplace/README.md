# Udacity Blockchain Capstone

The capstone will build upon the knowledge you have gained in the course in order to build a decentralized housing product. 

Tag: `GET_PASSES_THIS_REPO_UDACITY_PLEASE`

# Configuration

## package.json

```json
{
    "lite-server": "2.4.0"
    "openzeppelin-solidity": "^2.2.0",
    "solc": "^0.5.2",
    "solc-js": "^0.5.2",
    "truffle-hdwallet-provider": "^1.0.17"
}
```

# Docker

Reference: https://andresaaap.medium.com/creating-simple-zero-knowledge-verifier-contract-with-zokrates-0-5-0-solidity-0-5-0-13e9d615fe80

`docker.start.sh`

```bash
docker pull zokrates/zokrates:0.5.0

cd zokrates
docker run -v /Users/namnguyen/Desktop/Projects/blockchain/training_udacity_blockchain/proj08_realestate-marketplace/zokrates/code:/home/zokrates/code -ti zokrates/zokrates:0.5.0 /bin/bash

cd code/square
~/zokrates compile -i square.code
~/zokrates setup
~/zokrates compute-witness -a 3 9
~/zokrates generate-proof
~/zokrates export-verifier
```


# Contracts

## Build & Deploy

`truffle migrate --reset`

```bash

Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.


Starting migrations...
======================
> Network name:    'development'
> Network id:      5777
> Block gas limit: 6721975 (0x6691b7)


1_initial_migration.js
======================

   Replacing 'Migrations'
   ----------------------
   > transaction hash:    0x91294f39b1a4b2a7570b6127bdc4fcafee3bc54f2c3f04ed752efbe8b726d4d0
   > Blocks: 0            Seconds: 0
   > contract address:    0x7F16A6410F3bc19D2bCC3c96F5a7476250269177
   > block number:        1372
   > block timestamp:     1660585761
   > account:             0x4ffAFDF5E60304f22ec3d6BD704fC37a372DAc92
   > balance:             76.56888122
   > gas used:            263741 (0x4063d)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00527482 ETH

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00527482 ETH


2_deploy_contracts.js
=====================

   Deploying 'CustomERC721Token'
   -----------------------------
   > transaction hash:    0xf6a62400290d8e1ea2d8cefe1de79cc3789ec369eb6589d3ce900612e4307c78
   > Blocks: 0            Seconds: 0
   > contract address:    0xbDa091903E09700997581009E5874B9B93FD8A4c
   > block number:        1374
   > block timestamp:     1660585763
   > account:             0x4ffAFDF5E60304f22ec3d6BD704fC37a372DAc92
   > balance:             76.46670706
   > gas used:            5066685 (0x4d4fbd)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.1013337 ETH


   Replacing 'Verifier'
   --------------------
   > transaction hash:    0xee5b7158f8449b76864b3fbab8201511dcfc157928701522764e005e1e628ac9
   > Blocks: 0            Seconds: 0
   > contract address:    0x2cef16012A6595cfc312AFed29A98f08153e618b
   > block number:        1375
   > block timestamp:     1660585763
   > account:             0x4ffAFDF5E60304f22ec3d6BD704fC37a372DAc92
   > balance:             76.46528166
   > gas used:            71270 (0x11666)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.0014254 ETH


   Replacing 'SolnSquareVerifier'
   ------------------------------
   > transaction hash:    0xecd1c5d6ec5e2841368dafba6a1d33a957f4957403102181d011dbfe6d8243b9
   > Blocks: 0            Seconds: 0
   > contract address:    0x343720D6700d5A829446A7550FcE380d61C0A22F
   > block number:        1376
   > block timestamp:     1660585763
   > account:             0x4ffAFDF5E60304f22ec3d6BD704fC37a372DAc92
   > balance:             76.34874124
   > gas used:            5827021 (0x58e9cd)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.11654042 ETH

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.21929952 ETH

Summary
=======
> Total deployments:   4
> Final cost:          0.22457434 ETH

```


## proof.json
```json
{
        "proof": {
            "a": ["0x073abb46139872b81ef19ef6c4ce7aa93fe727064c3bc251a42b840f0cff0b8a", "0x0adad7d87b455cec6c7a13c68b2f12b4435e3cdd09cdcd89ae38609de28b1ef9"],
            "b": [["0x1910356a935177ff3a430272adfa549fdde8c00437656f35b19f39eca43330b6", "0x0415358716381f3885327e4ffc7eea4c3c1f28d44327d0fb561ba209255ac817"], ["0x1f6b6da9341b6d7f4c8ff1d2b7e8a1f317d53b7b2f015ef915fbdfe401b7bf98", "0x15837f3b6d8a8361e985fdaf0d35b834c6272fe9eca0695d367a1aac29b1d3d1"]],
            "c": ["0x1baa5f556502bd8ddc342ec269bb1324a2f7df627d8eec8740bbd505510f1551", "0x2deadbb08c0bc0e03194f2f984a0a5d100511fb3878d81c68544874ddd5c865f"]
        },
        "inputs": ["0x0000000000000000000000000000000000000000000000000000000000000009", "0x0000000000000000000000000000000000000000000000000000000000000001"]
    }
```

# Test results

Result folder: `results`

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
