// GET_PASSES_THIS_REPO_UDACITY_PLEASE
// define a variable to import the <Verifier> or <renamedVerifier> solidity contract generated by Zokrates

var Verifier = artifacts.require('Verifier');
var proof_json = require("../../zokrates/code/square/proof.json");

contract('TestSquareVerifier', accounts => {
    const CONTRACT_NAME = "NguyenNam RealEstate Marketplace"
    const CONTRACT_SYMBOL = "NRM"
    const CONTRACT_BASE_TOKEN_URI = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"

    let owner = accounts[0];



    // // Test verification with correct proof
    // // - use the contents from proof.json generated from zokrates steps
    // describe('Test verification with correct proof', function () {
    //     beforeEach(async function () {
    //         this.contract = await Verifier.new({from: owner});
    //     })

    //     it('verifyTx', async function () {
    //         let result = await this.contract.verifyTx.call(proof_json.proof.a,proof_json.proof.b,proof_json.proof.c,proof_json.inputs);
    //         assert.equal(result,true,`result(${result}) is true`)

    //     });
    // });


    // // Test verification with incorrect proof
    // describe('Test verification with incorrect proof', function () {
    //     beforeEach(async function () {
    //         this.contract = await Verifier.new({from: owner});
    //     })

    //     it('verifyTx', async function () {
    //         let proof_incorrect = Object.assign({}, proof_json);
    //         proof_incorrect["inputs"] = ["0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000002"]

    //         // console.log({proof_incorrect)
    //         let result = await this.contract.verifyTx.call(proof_incorrect.proof.a,proof_incorrect.proof.b,proof_incorrect.proof.c,proof_incorrect.inputs);
    //         // console.log({result})
    //         assert.equal(result,false,`result(${result}) is false`)

    //     });
    // });

    describe('Test verification', function () {
        beforeEach(async function () {
            this.contract = await Verifier.new({from: owner});
        })

        it('verifyTx with correct proof', async function () {
            // console.log({proof_json)
            let result = await this.contract.verifyTx.call(proof_json.proof.a,proof_json.proof.b,proof_json.proof.c,proof_json.inputs);
            // console.log({result})
            assert.equal(result,true,`result(${result}) is true`)

        });
        it('verifyTx with incorrect proof', async function () {
            let proof_incorrect = Object.assign({}, proof_json);
            proof_incorrect["inputs"] = ["0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000002"]

            // console.log({proof_incorrect)
            let result = await this.contract.verifyTx.call(proof_incorrect.proof.a,proof_incorrect.proof.b,proof_incorrect.proof.c,proof_incorrect.inputs);
            // console.log({result})
            assert.equal(result,false,`result(${result}) is false`)

        });
    });

})

