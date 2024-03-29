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

   Replacing 'Migrations'
   ----------------------
   > block number:        11213493
   > block timestamp:     1660667609
   > account:             0x27b5419afb9c3D99A262046383e083Ae7d81900a
   > balance:             1.324386514516348127
   > gas used:            226537 (0x374e9)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.005663425 ETH

   -------------------------------------
   > Total cost:         0.005663425 ETH


2_deploy_contracts.js
=====================

   Replacing 'CustomERC721Token'
   -----------------------------
   > block number:        11213495
   > block timestamp:     1660667624
   > account:             0x27b5419afb9c3D99A262046383e083Ae7d81900a
   > balance:             1.218144814516348127
   > gas used:            4203905 (0x402581)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.105097625 ETH


   Replacing 'Verifier'
   --------------------
   > block number:        11213496
   > block timestamp:     1660667627
   > account:             0x27b5419afb9c3D99A262046383e083Ae7d81900a
   > balance:             1.193328339516348127
   > gas used:            992659 (0xf2593)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.024816475 ETH


   Replacing 'SolnSquareVerifier'
   ------------------------------
   > block number:        11213497
   > block timestamp:     1660667640
   > account:             0x27b5419afb9c3D99A262046383e083Ae7d81900a
   > balance:             1.076078139516348127
   > gas used:            4690008 (0x479058)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.1172502 ETH

   -------------------------------------
   > Total cost:           0.2471643 ETH

Summary
=======
> Total deployments:   4
> Final cost:          0.252827725 ETH




Starting migrations...
======================
> Network name:    'rinkeby'
> Network id:      4
> Block gas limit: 30000000 (0x1c9c380)


1_initial_migration.js
======================

   Replacing 'Migrations'
   ----------------------
   > transaction hash:    0x696530c217d9a209c74c69b28e533106b27ee25a5285caddc3ee3758cc86b577
   > Blocks: 0            Seconds: 13
   > contract address:    0x10bBA51a92Ec8EE4DF4a15853762DFeb33A73872
   > block number:        11213501
   > block timestamp:     1660667664
   > account:             0x27b5419afb9c3D99A262046383e083Ae7d81900a
   > balance:             1.324386514516348127
   > gas used:            226537 (0x374e9)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.005663425 ETH

   Pausing for 1 confirmations...

   -------------------------------
   > confirmation number: 1 (block: 11213502)
   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.005663425 ETH


2_deploy_contracts.js
=====================

   Replacing 'CustomERC721Token'
   -----------------------------
   > transaction hash:    0x54aa4d0c183d4d71f7a8f49f0a66ce24b732fee4edd6dbf17ee76bbe20c3c766
   > Blocks: 1            Seconds: 9
   > contract address:    0x53699807dD184E15035eEd9D853AA6ff01727b6D
   > block number:        11213504
   > block timestamp:     1660667709
   > account:             0x27b5419afb9c3D99A262046383e083Ae7d81900a
   > balance:             1.218144814516348127
   > gas used:            4203905 (0x402581)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.105097625 ETH

   Pausing for 1 confirmations...

   -------------------------------
   > confirmation number: 1 (block: 11213505)

   Replacing 'Verifier'
   --------------------
   > transaction hash:    0x35ab1a26e6aac3ac1b947668e7fae21a559f475d4a3c3ffc67cdbf284ee12dc4
   > Blocks: 1            Seconds: 13
   > contract address:    0xb3B31A417ADFD9c42b4eB83fEED0a6197BC25841
   > block number:        11213506
   > block timestamp:     1660667739
   > account:             0x27b5419afb9c3D99A262046383e083Ae7d81900a
   > balance:             1.193328339516348127
   > gas used:            992659 (0xf2593)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.024816475 ETH

   Pausing for 1 confirmations...

   -------------------------------
   > confirmation number: 1 (block: 11213507)

   Replacing 'SolnSquareVerifier'
   ------------------------------
   > transaction hash:    0x6eefff3cc25fdd0b1da327f2562012baa7248f9845908c1478ed5ecdd9bafacd
   > Blocks: 1            Seconds: 13
   > contract address:    0xDcC6F1D97924E041D46AFC2D541A628c5a16B0c6
   > block number:        11213508
   > block timestamp:     1660667769
   > account:             0x27b5419afb9c3D99A262046383e083Ae7d81900a
   > balance:             1.076078139516348127
   > gas used:            4690008 (0x479058)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.1172502 ETH

   Pausing for 1 confirmations...

   -------------------------------
   > confirmation number: 1 (block: 11213509)
   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:           0.2471643 ETH

Summary
=======
> Total deployments:   4
> Final cost:          0.252827725 ETH

```

## Contracts address

Contract | Address | EtherScan Url
------- | ------- | -------
SolnSquareVerifier | 0xDcC6F1D97924E041D46AFC2D541A628c5a16B0c6 | https://rinkeby.etherscan.io/address/0xDcC6F1D97924E041D46AFC2D541A628c5a16B0c6


ABI: [abi.json](./abi.json)

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
Using network 'development'.


Compiling your contracts...
===========================
> Compiling ./contracts/ERC721Mintable.sol
> Compiling ./contracts/SolnSquareVerifier.sol
> Artifacts written to /var/folders/ns/wp1k8hz5079gx354pnqd65yc0000gn/T/test--15719-FdDtmnH5tkX5
> Compiled successfully using:
   - solc: 0.5.16+commit.9c3226ce.Emscripten.clang


  Contract: TestERC721Mintable
    match erc721 spec
      ✔ should return total supply (67ms)
      ✔ should get token balance (54ms)
      ✔ should return token uri (279ms)
      ✔ should transfer token from one owner to another (311ms)
    have ownership properties
      ✔ should fail when minting when address is not contract owner (147ms)
      ✔ should return contract owner (55ms)

  Contract: TestSolnSquareVerifier
    Test if a new solution can be added for contract - SolnSquareVerifier
      ✔ Test if a new solution can be added for contract - SolnSquareVerifier (1556ms)
{ eventSolutionAddedEmitted: true }
      ✔ Test if an ERC721 token can be minted for contract - SolnSquareVerifier (1477ms)

  Contract: TestSquareVerifier
    Test verification
      ✔ verifyTx with correct proof (475ms)
      ✔ verifyTx with incorrect proof (461ms)


  10 passing (22s)

```

# OpenSea

[Create NFTs for Free on OpenSea](https://opensea.io/blog/announcements/introducing-the-collection-manager/)



## Collection
https://testnets.opensea.io/collection/nguyennam-realestate-marketplace-v3

I IMPORT CORRECTLY CONTRACT ( 0xDcC6F1D97924E041D46AFC2D541A628c5a16B0c6 ) into OpenSea

Steps:
1. Follow this video to interact with Contract: https://www.youtube.com/watch?v=8MChn-NJJB0&ab_channel=AndresPinzon
2. Minted
3. Import minted contract into OpenSea


## NFT here:
I created by "Create" button from OpenSea

https://testnets.opensea.io/collection/nguyen-nam-realestate-marketplace




# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
