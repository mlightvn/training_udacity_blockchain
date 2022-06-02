// Reference
//   https://ethereum.stackexchange.com/a/92694/48203

let configuration = require('./configuration.js');
const EthereumTx = require('ethereumjs-tx').Transaction

var Web3 = require('web3')

// var web3 = new Web3(configuration.web3Provider.endpoint)
let web3 = new Web3(Web3.givenProvider || configuration.web3Provider.endpoint);

//Setting Receiving and Sending Address

var sendingAddress = configuration.sendingAddress
var receivingAddress = configuration.receivingAddress

//Checking the balance of each account in ether

web3.eth.getBalance(sendingAddress).then(balance => console.log(web3.utils.fromWei(balance, 'ether')))
web3.eth.getBalance(receivingAddress).then(balance => console.log(web3.utils.fromWei(balance, 'ether')))

//Creating a transaction
var rawTransaction ={
    nonce: web3.utils.toHex(configuration.nonceUInt),
    to: receivingAddress,
    gasPrice: web3.utils.toHex(20000000),
    gasLimit: web3.utils.toHex(30000),
    value: web3.utils.toHex(configuration.weiToEtherUnit / 1000),
    data: web3.utils.toHex("")
}

//Sign the Transaction

var privateKey = configuration.privateKey

var senderPrivateKeyHex = new Buffer.from(privateKey,'hex')

var transaction = new EthereumTx(rawTransaction)

transaction.sign(senderPrivateKeyHex)

//Send transaction to the network

var serializedTransaction = transaction.serialize()

web3.eth.sendSignedTransaction(serializedTransaction)
