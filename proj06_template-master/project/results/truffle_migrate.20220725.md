# Migrate --network rinkeby

```bash
truffle migrate --reset --network rinkeby
```

# Console output

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
   > block number:        11081238
   > block timestamp:     1658678560
   > account:             0x27b5419afb9c3D99A262046383e083Ae7d81900a
   > balance:             0.500226621161018343
   > gas used:            226537 (0x374e9)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.005663425 ETH

   -------------------------------------
   > Total cost:         0.005663425 ETH


2_deploy_contracts.js
=====================

   Replacing 'FarmerRole'
   ----------------------
   > block number:        11081240
   > block timestamp:     1658678564
   > account:             0x27b5419afb9c3D99A262046383e083Ae7d81900a
   > balance:             0.489670271161018343
   > gas used:            376491 (0x5beab)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.009412275 ETH


   Replacing 'DistributorRole'
   ---------------------------
   > block number:        11081241
   > block timestamp:     1658678569
   > account:             0x27b5419afb9c3D99A262046383e083Ae7d81900a
   > balance:             0.480257996161018343
   > gas used:            376491 (0x5beab)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.009412275 ETH


   Replacing 'RetailerRole'
   ------------------------
   > block number:        11081242
   > block timestamp:     1658678573
   > account:             0x27b5419afb9c3D99A262046383e083Ae7d81900a
   > balance:             0.470845121161018343
   > gas used:            376515 (0x5bec3)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.009412875 ETH


   Replacing 'ConsumerRole'
   ------------------------
   > block number:        11081243
   > block timestamp:     1658678578
   > account:             0x27b5419afb9c3D99A262046383e083Ae7d81900a
   > balance:             0.461432846161018343
   > gas used:            376491 (0x5beab)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.009412275 ETH


   Replacing 'SupplyChain'
   -----------------------
   > block number:        11081244
   > block timestamp:     1658678587
   > account:             0x27b5419afb9c3D99A262046383e083Ae7d81900a
   > balance:             0.379580971161018343
   > gas used:            3274075 (0x31f55b)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.081851875 ETH

   -------------------------------------
   > Total cost:         0.119501575 ETH

Summary
=======
> Total deployments:   6
> Final cost:          0.125165 ETH




Starting migrations...
======================
> Network name:    'rinkeby'
> Network id:      4
> Block gas limit: 30000000 (0x1c9c380)


1_initial_migration.js
======================

   Replacing 'Migrations'
   ----------------------
   > transaction hash:    0xa265231b718160ba88736d8b1afb1c07714b48f1acee29454d2e08b399fe398c
   > Blocks: 2            Seconds: 22
   > contract address:    0xc6A8e60a6A2782a36dd3AF78b1382996039708B4
   > block number:        11081246
   > block timestamp:     1658678614
   > account:             0x27b5419afb9c3D99A262046383e083Ae7d81900a
   > balance:             0.500226621161018343
   > gas used:            226537 (0x374e9)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.005663425 ETH

   Pausing for 1 confirmations...

   -------------------------------
   > confirmation number: 1 (block: 11081247)
   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.005663425 ETH


2_deploy_contracts.js
=====================

   Replacing 'FarmerRole'
   ----------------------
   > transaction hash:    0x9ab2c81faf827b4ddf01a297c0d86e14936a6feabc9701e779157e2d30aac383
   > Blocks: 1            Seconds: 19
   > contract address:    0x879B3FDA84C4e7b5E359b5B5564Bc5bD4Bc30705
   > block number:        11081250
   > block timestamp:     1658678674
   > account:             0x27b5419afb9c3D99A262046383e083Ae7d81900a
   > balance:             0.489670271161018343
   > gas used:            376491 (0x5beab)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.009412275 ETH

   Pausing for 1 confirmations...

   -------------------------------
   > confirmation number: 1 (block: 11081253)

   Replacing 'DistributorRole'
   ---------------------------
   > transaction hash:    0xf5830f21282a7fbe13f08fb159f95ea03ed2491bae4822ffd5eedd9074c33f21
   > Blocks: 2            Seconds: 21
   > contract address:    0xd1F474Aa36A4c988ED85cE2cf5ecD5D0d7182A68
   > block number:        11081255
   > block timestamp:     1658678749
   > account:             0x27b5419afb9c3D99A262046383e083Ae7d81900a
   > balance:             0.480257996161018343
   > gas used:            376491 (0x5beab)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.009412275 ETH

   Pausing for 1 confirmations...

   -------------------------------
   > confirmation number: 1 (block: 11081256)

   Replacing 'RetailerRole'
   ------------------------
   > transaction hash:    0x1e69ed6a9321ff37f992d14e73470236c08fa77cdd73a9893d253f77dd325f3b
   > Blocks: 1            Seconds: 13
   > contract address:    0xF1c0d1950da6B1e5a5C03dDbc0c973E7c864dd0A
   > block number:        11081257
   > block timestamp:     1658678779
   > account:             0x27b5419afb9c3D99A262046383e083Ae7d81900a
   > balance:             0.470845121161018343
   > gas used:            376515 (0x5bec3)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.009412875 ETH

   Pausing for 1 confirmations...

   -------------------------------
   > confirmation number: 1 (block: 11081258)

   Replacing 'ConsumerRole'
   ------------------------
   > transaction hash:    0x74f404dc2e07bdc153a202c481fc8332a8c0f0f3dbcbb73a18b78320aa43d10d
   > Blocks: 2            Seconds: 22
   > contract address:    0x4855997a4D405598F287766c60bC83A5A84440af
   > block number:        11081260
   > block timestamp:     1658678825
   > account:             0x27b5419afb9c3D99A262046383e083Ae7d81900a
   > balance:             0.461432846161018343
   > gas used:            376491 (0x5beab)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.009412275 ETH

   Pausing for 1 confirmations...

   -------------------------------
   > confirmation number: 1 (block: 11081262)

   Replacing 'SupplyChain'
   -----------------------
   > transaction hash:    0xfa307248db977154e2ed389b15a4ab42f934b917ec65f20d4758e0770b18b317
   > Blocks: 2            Seconds: 33
   > contract address:    0xEEA9462CB4d8Ffae07224a6ae78eA44967a6a48a
   > block number:        11081264
   > block timestamp:     1658678885
   > account:             0x27b5419afb9c3D99A262046383e083Ae7d81900a
   > balance:             0.379580971161018343
   > gas used:            3274075 (0x31f55b)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.081851875 ETH

   Pausing for 1 confirmations...

   -------------------------------
   > confirmation number: 1 (block: 11081267)
   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.119501575 ETH

Summary
=======
> Total deployments:   6
> Final cost:          0.125165 ETH
```