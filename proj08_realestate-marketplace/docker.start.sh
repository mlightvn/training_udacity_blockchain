#!/bin/bash

# https://learn.udacity.com/nanodegrees/nd1309/parts/8f9b0ba4-18c6-4031-a0c0-838c504b3cce/lessons/e6b7081d-803e-49df-90c4-dfbcf61dcb7b/concepts/21e74ed9-d8eb-4f64-9e18-4ef656919a3b


# https://andresaaap.medium.com/creating-simple-zero-knowledge-verifier-contract-with-zokrates-0-7-13-solidity-0-8-0-666518e1f411
# https://www.youtube.com/watch?v=0pY1Sd7aDjM&ab_channel=AndresPinzon

# cd zokrates
# docker run -v /Users/namnguyen/Desktop/Projects/blockchain/training_udacity_blockchain/proj08_realestate-marketplace/zokrates/code:/home/zokrates/code -ti zokrates/zokrates:latest /bin/bash

# cd code/square
# zokrates compile -i square.code
# zokrates setup
# zokrates compute-witness -a 337 113569
# zokrates generate-proof
# zokrates export-verifier


# https://andresaaap.medium.com/creating-simple-zero-knowledge-verifier-contract-with-zokrates-0-5-0-solidity-0-5-0-13e9d615fe80

docker pull zokrates/zokrates:0.5.0

cd zokrates
docker run -v /Users/namnguyen/Desktop/Projects/blockchain/training_udacity_blockchain/proj08_realestate-marketplace/zokrates/code:/home/zokrates/code -ti zokrates/zokrates:0.5.0 /bin/bash

cd code/square
~/zokrates compile -i square.code
~/zokrates setup
~/zokrates compute-witness -a 3 9
~/zokrates generate-proof
~/zokrates export-verifier
