# Migrate --network rinkeby

```bash
truffle migrate --reset --network rinkeby
```

# Console output

```bash
Migrations dry-run (simulation)
===============================
> Network name:    'rinkeby-fork'
> Network id:      4
> Block gas limit: 30000000 (0x1c9c380)


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > block number:        11038881
   > block timestamp:     1658042138
   > account:             0x27b5419afb9c3D99A262046383e083Ae7d81900a
   > balance:             1.499151248993654939
   > gas used:            226525 (0x374dd)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.005663125 ETH

   -------------------------------------
   > Total cost:         0.005663125 ETH


2_deploy_contracts.js
=====================

   Deploying 'FarmerRole'
   ----------------------
   > block number:        11038883
   > block timestamp:     1658042143
   > account:             0x27b5419afb9c3D99A262046383e083Ae7d81900a
   > balance:             1.490340073993654939
   > gas used:            306684 (0x4adfc)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.0076671 ETH


   Deploying 'DistributorRole'
   ---------------------------
   > block number:        11038884
   > block timestamp:     1658042147
   > account:             0x27b5419afb9c3D99A262046383e083Ae7d81900a
   > balance:             1.482762698993654939
   > gas used:            303095 (0x49ff7)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.007577375 ETH


   Deploying 'RetailerRole'
   ------------------------
   > block number:        11038885
   > block timestamp:     1658042150
   > account:             0x27b5419afb9c3D99A262046383e083Ae7d81900a
   > balance:             1.479849823993654939
   > gas used:            116515 (0x1c723)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.002912875 ETH


   Deploying 'ConsumerRole'
   ------------------------
   > block number:        11038886
   > block timestamp:     1658042153
   > account:             0x27b5419afb9c3D99A262046383e083Ae7d81900a
   > balance:             1.472272448993654939
   > gas used:            303095 (0x49ff7)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.007577375 ETH


   Deploying 'SupplyChain'
   -----------------------
   > block number:        11038887
   > block timestamp:     1658042158
   > account:             0x27b5419afb9c3D99A262046383e083Ae7d81900a
   > balance:             1.418602748993654939
   > gas used:            2146788 (0x20c1e4)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.0536697 ETH

   -------------------------------------
   > Total cost:         0.079404425 ETH

Summary
=======
> Total deployments:   6
> Final cost:          0.08506755 ETH




Starting migrations...
======================
> Network name:    'rinkeby'
> Network id:      4
> Block gas limit: 29970705 (0x1c95111)


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0xcba1db4ba51d100747bff49eac95ae74b7909f9c3ad3af4594b052dc0324442d
   > Blocks: 1            Seconds: 9
   > contract address:    0x80394007206e0eb46587a5368CF423E15ab2fF9D
   > block number:        11038888
   > block timestamp:     1658042178
   > account:             0x27b5419afb9c3D99A262046383e083Ae7d81900a
   > balance:             1.499151248993654939
   > gas used:            226525 (0x374dd)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.005663125 ETH

   Pausing for 2 confirmations...

   -------------------------------
   > confirmation number: 1 (block: 11038889)
   > confirmation number: 2 (block: 11038890)
   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.005663125 ETH


2_deploy_contracts.js
=====================

   Deploying 'FarmerRole'
   ----------------------
   > transaction hash:    0x55db0716f799e7a7b1f1fd6563e0099a91732d558321b77271d85e1e2f17d6d8
   > Blocks: 1            Seconds: 9
   > contract address:    0x9E293E437D49646b942ebCfB1eB8E573B9d3A5DE
   > block number:        11038892
   > block timestamp:     1658042238
   > account:             0x27b5419afb9c3D99A262046383e083Ae7d81900a
   > balance:             1.490340073993654939
   > gas used:            306684 (0x4adfc)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.0076671 ETH

   Pausing for 2 confirmations...

   -------------------------------
   > confirmation number: 1 (block: 11038893)
   > confirmation number: 2 (block: 11038894)

   Deploying 'DistributorRole'
   ---------------------------
   > transaction hash:    0x8c507c31d80da6e3bf646bd6d8fa3e54cde0234211359e9d7acd724e5d94e148
   > Blocks: 1            Seconds: 6
   > contract address:    0x2eeb5bAeCdb8578e5e928C96CCDcd8D08c59f579
   > block number:        11038895
   > block timestamp:     1658042283
   > account:             0x27b5419afb9c3D99A262046383e083Ae7d81900a
   > balance:             1.482762698993654939
   > gas used:            303095 (0x49ff7)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.007577375 ETH

   Pausing for 2 confirmations...

   -------------------------------
   > confirmation number: 1 (block: 11038896)
   > confirmation number: 2 (block: 11038897)

   Deploying 'RetailerRole'
   ------------------------
   > transaction hash:    0x53484d0412feaa49a88e87d08eadb213a68df4470b96ea95f08e24caf4ab2d96
   > Blocks: 1            Seconds: 9
   > contract address:    0x6680b32b3e9f74337b22CDBAB5ac9aDc86E555eE
   > block number:        11038898
   > block timestamp:     1658042328
   > account:             0x27b5419afb9c3D99A262046383e083Ae7d81900a
   > balance:             1.479849823993654939
   > gas used:            116515 (0x1c723)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.002912875 ETH

   Pausing for 2 confirmations...

   -------------------------------
   > confirmation number: 1 (block: 11038899)
   > confirmation number: 2 (block: 11038900)

   Deploying 'ConsumerRole'
   ------------------------
   > transaction hash:    0xa565f365b63023a753305da8656496ae73d1ff823213cec9d3b29236f0f626de
   > Blocks: 1            Seconds: 10
   > contract address:    0x7F2Ef36061a1e0fE379D0d9418F77aae16F6371a
   > block number:        11038901
   > block timestamp:     1658042373
   > account:             0x27b5419afb9c3D99A262046383e083Ae7d81900a
   > balance:             1.472272448993654939
   > gas used:            303095 (0x49ff7)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.007577375 ETH

   Pausing for 2 confirmations...

   -------------------------------
   > confirmation number: 1 (block: 11038902)
   > confirmation number: 2 (block: 11038903)

   Deploying 'SupplyChain'
   -----------------------
   > transaction hash:    0xb952d994f4085cd056d722ead96308a39ba1efe0a66544ab8b821f0253bfeafa
   > Blocks: 0            Seconds: 5
   > contract address:    0x6015891e7aD1904a3b6dDBE29bCD01F6471c3889
   > block number:        11038904
   > block timestamp:     1658042418
   > account:             0x27b5419afb9c3D99A262046383e083Ae7d81900a
   > balance:             1.418602748993654939
   > gas used:            2146788 (0x20c1e4)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.0536697 ETH

   Pausing for 2 confirmations...

   -------------------------------
   > confirmation number: 1 (block: 11038905)
   > confirmation number: 2 (block: 11038906)
   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.079404425 ETH

Summary
=======
> Total deployments:   6
> Final cost:          0.08506755 ETH
```