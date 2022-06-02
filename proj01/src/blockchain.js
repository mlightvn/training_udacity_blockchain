/**
 *                          Blockchain Class
 *  The Blockchain class contain the basics functions to create your own private blockchain
 *  It uses libraries like `crypto-js` to create the hashes for each block and `bitcoinjs-message` 
 *  to verify a message signature. The chain is stored in the array
 *  `this.chain = [];`. Of course each time you run the application the chain will be empty because and array
 *  isn't a persisten storage method.
 *  
 */

const SHA256 = require('crypto-js/sha256');
const {Block} = require('./block.js');
const bitcoin = require('bitcoinjs-lib');
const bitcoinMessage = require('bitcoinjs-message');
const helpers = require('../helpers.js');
const { cloneDeep } = require('lodash');

// import { Signer, SignerAsync, ECPairInterface, ECPairFactory, ECPairAPI, TinySecp256k1Interface } from 'ecpair';
// import * as crypto from 'crypto';

// const { ECPairFactory} = require('ecpair');
// const crypto = require('crypto');

// const tinysecp = require('tiny-secp256k1');

// const ECPair = ECPairFactory(tinysecp);

class Blockchain {

    /**
     * Constructor of the class, you will need to setup your chain array and the height
     * of your chain (the length of your chain array).
     * Also everytime you create a Blockchain class you will need to initialized the chain creating
     * the Genesis Block.
     * The methods in this class will always return a Promise to allow client applications or
     * other backends to call asynchronous functions.
     */
    constructor() {
        this.chain = [];
        // this.height = -1;
        this.initializeChain();

        this.initFakeBlocksIntoChain();

    }

    /**
     * This method will check for the height of the chain and if there isn't a Genesis Block it will create it.
     * You should use the `addBlock(block)` to create the Genesis Block
     * Passing as a data `{data: 'Genesis Block'}`
     */
    async initializeChain() {
        if( this.chain.length === 0){
            let data = cloneDeep(helpers.genesis.body);
            let block = await new Block({data});
            await this._addBlock(block);
        }
    }

    async initFakeBlocksIntoChain() {
        let addresses = [
            '1JbGg9Nd2mGWWa1CnWnBh8C9gVPvkVnjhj',
            '1HZwkjkeaoZfTSaJxDw6aKkxp45agDiEzN',
        ];

        await addresses.forEach(async (address, index) => {
            let block = new Block({data: {
                address,
                star: {
                    ra: '16h 26m 56s',
                    dec: '-26° 29\' 24.8',
                    story: 'Found star using https://www.google.com/sky/',
                },
                // description: `[${index}]starRegistry"`,
                author: "Nguyen Ngoc Nam",
            }});
            await this._addBlock(block);

            block = new Block({data:{
                address,
                star: {
                    ra: 'unknown',
                    dec: 'unknown',
                    story: 'https://www.google.com/intl/en_ALL/sky/#latitude=69.83003273842468&longitude=-36.35780945931275&zoom=11&Spitzer=0.00&ChandraXO=0.00&Galex=0.00&IRAS=0.00&WMAP=0.00&Cassini=0.00&slide=1&mI=-1&oI=-1',
                },
                // description: `[${index}]starRegistry"`,
                author: "Nguyen Ngoc Nam",
            }});
            await this._addBlock(block);
        });
    }

    getChainSize() {
        return new Promise((resolve) => {
            resolve(this.chain.length);
        });
    }

    /**
     * Utility method that return a Promise that will resolve with the height of the chain
     */
    async getChainHeight() {
        return await new Promise((resolve) => {
            resolve(this.chain.length - 1);
        });
    }

    /**
     * _addBlock(block) will store a block in the chain
     * @param {*} block 
     * The method will return a Promise that will resolve with the block added
     * or reject if an error happen during the execution.
     * You will need to check for the height to assign the `previousBlockHash`,
     * assign the `timestamp` and the correct `height`...At the end you need to 
     * create the `block hash` and push the block into the chain array. Don't for get 
     * to update the `this.height`
     * Note: the symbol `_` in the method name indicates in the javascript convention 
     * that this method is a private method. 
     */
    _addBlock(block) {
        let self = this;
        return new Promise((resolve, reject) => {
            if(self.chain.length > 0){
                block.previousBlockHash = self.chain[self.chain.length - 1].hash;
            }
            block.height = self.chain.length;
            block.time = helpers.getCurrentTimeStamp();
            block.hash = SHA256(JSON.stringify(block)).toString();
            console.log({block})

            if(block.validate()){
                self.chain.push(block);
                resolve(block);
            }else{
                reject({result: 'Block not valid'});
            }
        });
    }

    /**
     * The requestMessageOwnershipVerification(address) method
     * will allow you  to request a message that you will use to
     * sign it with your Bitcoin Wallet (Electrum or Bitcoin Core)
     * This is the first step before submit your Block.
     * The method return a Promise that will resolve with the message to be signed
     * @param {*} address 
     */
    requestMessageOwnershipVerification(address) {
        return new Promise((resolve) => {
            resolve(`${address}:${helpers.getCurrentTimeStamp()}:starRegistry`);
        });
    }

    /**
     * The submitStar(address, message, signature, star) method
     * will allow users to register a new Block with the star object
     * into the chain. This method will resolve with the Block added or
     * reject with an error.
     * Algorithm steps:
     * 1. Get the time from the message sent as a parameter example: `parseInt(message.split(':')[1])`
     * 2. Get the current time: `let currentTime = parseInt(new Date().getTime().toString().slice(0, -3));`
     * 3. Check if the time elapsed is less than 5 minutes
     * 4. Veify the message with wallet address and signature: `bitcoinMessage.verify(message, address, signature)`
     * 5. Create the block and add it to the chain
     * 6. Resolve with the block added.
     * 
     * Reference:
     *   get signature: https://reinproject.org/bitcoin-signature-tool/#sign
     * 
     * @param {*} address 
     * @param {*} message 
     * @param {*} signature 
     * @param {*} star
     */
    submitStar(address, message, signature, star) {
        let self = this;
        return new Promise(async (resolve, reject) => {
            let time = parseInt(message.split(':')[1])
            let currentTime = helpers.getCurrentTimeStamp();
            if(currentTime - time < 300){
                if(bitcoinMessage.verify(message, address, signature)){
                    let data = {
                        address,
                        // message,
                        // signature,
                        star,
                        description: "starRegistry",
                    }
                    let block = new Block({
                        data
                    });
                    await self._addBlock(block);
                    resolve({block, block_body_decoded: data});
                }else{
                    reject({result: 'Message not verified'});
                }
            }else{
                reject({result: "Request expired (must less than 5 minutes after request ownership verification)"});
            }
        });
    }

    /**
     * This method will return a Promise that will resolve with the Block
     *  with the hash passed as a parameter.
     * Search on the chain array for the block that has the hash.
     * @param {*} hash 
     */
    getBlockByHash(hash) {
        let self = this;
        return new Promise((resolve, reject) => {
            let block = self.chain.filter(p => p.hash === hash)[0];
            if(block){
                resolve(block);
            } else {
                resolve(null);
            }
        });
    }

    /**
     * This method will return a Promise that will resolve with the Block object 
     * with the height equal to the parameter `height`
     * @param {*} height 
     */
    getBlockByHeight(height) {
        let self = this;
        return new Promise((resolve, reject) => {
            let block = self.chain.filter(block => block.height === height)[0];
            if(block){
                resolve(block);
            } else {
                reject({result: 'Block not found'});
            }
        });
    }

    /**
     * This method will return a Promise that will resolve with an array of Stars objects existing in the chain 
     * and are belongs to the owner with the wallet address passed as parameter.
     * Remember the star should be returned decoded.
     * @param {*} address 
     */
    getStarsByWalletAddress (address) {
        let self = this;
        let stars = [];
        return new Promise((resolve, reject) => {
            self.chain.forEach(block => {
                try {
                    let bodyDecoded = block.getBData();
                    if(bodyDecoded.address && bodyDecoded.address == address){
                        stars.push(bodyDecoded);
                        return block;
                    }
                } catch (error) {
                    console.log({error})
                    return null;
                }
            });

            resolve(stars);
        });
    }

    /**
     * This method will return a Promise that will resolve with the list of errors when validating the chain.
     * Steps to validate:
     * 1. You should validate each block using `validateBlock`
     * 2. Each Block should check the with the previousBlockHash
     */
    validateChain() {
        let self = this;
        let errorLog = [];
        return new Promise(async (resolve, reject) => {
            errorLog = await self.chain.filter(block => {
                let isValid = block.validate();
                if(!isValid){
                    return block;
                }
                if(!block.previousBlockHash
                    && block.previousBlockHash !== self.chain[block.height - 1].hash
                ){
                    return block;
                }
            });
            resolve(stars);
        });
    }

    /**
     * 
     * Reference:
     *   https://github.com/bitcoinjs/bitcoinjs-message
     *   https://github.com/bitcoinjs/ecpair
     * 
     * @param {*} privateKey
     * @param {*} address
     * @param {*} message
     * @returns
     * @memberof BlockChain
     */
    getSignatureMessage(privateKey, address, message){
        return {result: "failed"};

        // return new Promise((resolve, reject) => {
        //     const network = bitcoin.networks.bitcoin;
        //     let signature = "";

        //     console.log({address, network});

        //     // let privateKey = "5KYZdUEo39z3FPrtuX2QbbwGnNP5zTd7yyr2SC1j299sBCnWjss";

        //     const keyPair = helpers.keyPair();
        //     if(!privateKey){
        //         privateKey = keyPair.privateKey;
        //     }

        //     try {
        //         let signatureObj = bitcoinMessage.sign(message, privateKey, keyPair.compressed, helpers.extraEntropy);
        //         signature = signatureObj.toString('base64');
        //         console.log({signature});
        //     } catch (error) {
        //         reject({result: 'Cannot generate Signature', error});
        //     }

        //     if(signature === ""){
        //         reject({result: 'Signature not found'});
        //     }

        //     resolve(signature);
        // });
    }

}

module.exports.Blockchain = Blockchain;
