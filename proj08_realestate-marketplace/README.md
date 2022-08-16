# Udacity Blockchain Capstone

The capstone will build upon the knowledge you have gained in the course in order to build a decentralized housing product. 

Tag: `GET_PASSES_THIS_REPO_UDACITY_PLEASE`

# Configuration

## truffle version

```bash
Truffle v5.5.24 (core: 5.5.24)
Ganache v7.4.0
Solidity v0.5.16 (solc-js)
Node v16.13.2
Web3.js v1.7.4
```

## package.json

```json
{
    "dotenv": "^16.0.1",
    "lite-server": "2.4.0"
    "openzeppelin-solidity": "^2.2.0",
    "solc": "^0.5.2",
    "solc-js": "^0.5.2",
    "truffle-hdwallet-provider": "^1.0.17"
}
```

# Docker

Reference: https://andresaaap.medium.com/creating-simple-zero-knowledge-verifier-contract-with-zokrates-0-5-0-solidity-0-5-0-13e9d615fe80

## Create Container and create `verifier.sol` file
By this shellscript: `docker.start.sh`

```bash
docker pull zokrates/zokrates:0.5.0

docker run -v /Users/namnguyen/Desktop/Projects/blockchain/training_udacity_blockchain/proj08_realestate-marketplace/zokrates/code:/home/zokrates/code -ti zokrates/zokrates:0.5.0 /bin/bash

cd code/square
~/zokrates compile -i square.code
~/zokrates setup
~/zokrates compute-witness -a 3 9
~/zokrates generate-proof
~/zokrates export-verifier
```

## Access container

```bash
docker exec -it 21c8646173ab8334871213daca53f8984443bcfaf8598a30dd2f24fa25ed92b2 /bin/bash
```


# Contracts

## Build & Deploy

`truffle migrate --reset --network rinkeby`

```bash

Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.


Migrations dry-run (simulation)
===============================
> Network name:    'rinkeby-fork'
> Network id:      4
> Block gas limit: 30000000 (0x1c9c380)


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > block number:        11212816
   > block timestamp:     1660657437
   > account:             0x27b5419afb9c3D99A262046383e083Ae7d81900a
   > balance:             0.616470113052298853
   > gas used:            226537 (0x374e9)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.005663425 ETH

   -------------------------------------
   > Total cost:         0.005663425 ETH


2_deploy_contracts.js
=====================

   Deploying 'CustomERC721Token'
   -----------------------------
   > block number:        11212818
   > block timestamp:     1660657453
   > account:             0x27b5419afb9c3D99A262046383e083Ae7d81900a
   > balance:             0.511493213052298853
   > gas used:            4153313 (0x3f5fe1)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.103832825 ETH


   Deploying 'Verifier'
   --------------------
   > block number:        11212819
   > block timestamp:     1660657456
   > account:             0x27b5419afb9c3D99A262046383e083Ae7d81900a
   > balance:             0.486676738052298853
   > gas used:            992659 (0xf2593)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.024816475 ETH


   Deploying 'SolnSquareVerifier'
   ------------------------------
   > block number:        11212820
   > block timestamp:     1660657469
   > account:             0x27b5419afb9c3D99A262046383e083Ae7d81900a
   > balance:             0.370602338052298853
   > gas used:            4642976 (0x46d8a0)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.1160744 ETH

   -------------------------------------
   > Total cost:           0.2447237 ETH

Summary
=======
> Total deployments:   4
> Final cost:          0.250387125 ETH




Starting migrations...
======================
> Network name:    'rinkeby'
> Network id:      4
> Block gas limit: 30000000 (0x1c9c380)


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0xc2c6ca12144336c8d41032ae351de03002645445dc32d874c7e91086d03419d6
   > Blocks: 1            Seconds: 9
   > contract address:    0xEa5dB3cbAE2FAD12D31c79dEAbB36E05F0b719D3
   > block number:        11212824
   > block timestamp:     1660657488
   > account:             0x27b5419afb9c3D99A262046383e083Ae7d81900a
   > balance:             0.616470113052298853
   > gas used:            226537 (0x374e9)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.005663425 ETH

   Pausing for 1 confirmations...

   -------------------------------
   > confirmation number: 1 (block: 11212825)
   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.005663425 ETH


2_deploy_contracts.js
=====================

   Deploying 'CustomERC721Token'
   -----------------------------
   > transaction hash:    0x74f0af4a456752f560df48da7393426a8e277e9026cdb2d451ec13f91cd94463
   > Blocks: 2            Seconds: 21
   > contract address:    0x21eE457239e167e1749E97A0A9a5d7E91839Ca1f
   > block number:        11212828
   > block timestamp:     1660657548
   > account:             0x27b5419afb9c3D99A262046383e083Ae7d81900a
   > balance:             0.511493213052298853
   > gas used:            4153313 (0x3f5fe1)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.103832825 ETH

   Pausing for 1 confirmations...

   -------------------------------
   > confirmation number: 1 (block: 11212829)

   Deploying 'Verifier'
   --------------------
   > transaction hash:    0x524c86cc28be68fcee4172d0d6934bc47841f21002c8aadc287cd4c7d8769a8b
   > Blocks: 1            Seconds: 13
   > contract address:    0x1DE9D10209a7b091C024822862ebeFf558BcA6cb
   > block number:        11212830
   > block timestamp:     1660657578
   > account:             0x27b5419afb9c3D99A262046383e083Ae7d81900a
   > balance:             0.486676738052298853
   > gas used:            992659 (0xf2593)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.024816475 ETH

   Pausing for 1 confirmations...

   -------------------------------
   > confirmation number: 1 (block: 11212831)

   Deploying 'SolnSquareVerifier'
   ------------------------------
   > transaction hash:    0xa0a721f9748734f3289aaae3ebdfb088d52771aa69975ec3014598c2ba36592c
   > Blocks: 1            Seconds: 9
   > contract address:    0x5Ad1D15196f73687bfb4f901fe4cDD0d0893150c
   > block number:        11212832
   > block timestamp:     1660657608
   > account:             0x27b5419afb9c3D99A262046383e083Ae7d81900a
   > balance:             0.370602338052298853
   > gas used:            4642976 (0x46d8a0)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.1160744 ETH

   Pausing for 1 confirmations...

   -------------------------------
   > confirmation number: 1 (block: 11212833)
   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:           0.2447237 ETH

Summary
=======
> Total deployments:   4
> Final cost:          0.250387125 ETH

```

## Contracts address

Contract | Address | EtherScan Url
------- | ------- | -------
Migrations | 0xEa5dB3cbAE2FAD12D31c79dEAbB36E05F0b719D3 | https://rinkeby.etherscan.io/address/0xEa5dB3cbAE2FAD12D31c79dEAbB36E05F0b719D3
CustomERC721Token | 0x21eE457239e167e1749E97A0A9a5d7E91839Ca1f | https://rinkeby.etherscan.io/address/0x21eE457239e167e1749E97A0A9a5d7E91839Ca1f
Verifier | 0x1DE9D10209a7b091C024822862ebeFf558BcA6cb | https://rinkeby.etherscan.io/address/0x1DE9D10209a7b091C024822862ebeFf558BcA6cb
SolnSquareVerifier | 0x5Ad1D15196f73687bfb4f901fe4cDD0d0893150c | https://rinkeby.etherscan.io/address/0x5Ad1D15196f73687bfb4f901fe4cDD0d0893150c


## Test address
https://rinkeby.etherscan.io/address/0x27b5419afb9c3d99a262046383e083ae7d81900a

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

`truffle test`

```bash
```


`truffle test --network rinkeby`

```bash
```

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
