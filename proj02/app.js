let configuration = require('./configuration.js');
let Web3 = require("web3")
let EthereumTx = require("ethereumjs-tx").Transaction
// let web3 = new Web3(new Web3.providers.HttpProvider(configuration.web3Provider.endpoint))
let web3 = new Web3(Web3.givenProvider || configuration.web3Provider.endpoint);

// console.log(web3.eth.accounts)

// web3.eth.getAccounts().then(accounts => console.log(accounts))

/*##########################
CONFIGURATION
##########################*/

let sendingAddress = configuration.sendingAddress
let receivingAddress = configuration.receivingAddress

// -- Step 3: Check the balances of each address 
// web3.eth.getBalance(configuration.sendingAddress).then(console.log)
// web3.eth.getBalance(configuration.receivingAddress).then(console.log)

web3.eth.getBalance(sendingAddress).then(amount => console.log(web3.utils.fromWei(amount, 'ether')))
web3.eth.getBalance(receivingAddress).then(amount => console.log(web3.utils.fromWei(amount, 'ether')))


/*##########################

CREATE A TRANSACTION
##########################*/

// -- Step 4: Set up the transaction using the transaction variables as shown 
let rawTransaction = {
  nonce: web3.utils.toHex(configuration.nonceUInt),
  to: receivingAddress,
  gasPrice: web3.utils.toHex(20000000),
  gasLimit: web3.utils.toHex(30000),
  value: web3.utils.toHex(configuration.weiToEtherUnit / 1000),
  data: web3.utils.toHex(""),
}

// -- Step 5: View the raw transaction rawTransaction

// -- Step 6: Check the new account balances (they should be the same) 
// web3.eth.getBalance(sendingAddress).then(console.log)
// web3.eth.getBalance(receivingAddress).then(console.log)

// Note: They haven't changed because they need to be signed...

/*##########################
Sign the Transaction
##########################*/

// -- Step 7: Sign the transaction with the Hex value of the private key of the sender 
let privateKey = configuration.privateKey
var privateKeySenderHex = new Buffer.from(privateKey, 'hex')
let transaction = new EthereumTx(rawTransaction)
transaction.sign(privateKeySenderHex)

// /*#########################################
// Send the transaction to the network
// #########################################*/

// // -- Step 8: Send the serialized signed transaction to the Ethereum network.
let serializedTransaction = transaction.serialize();
web3.eth.sendSignedTransaction(serializedTransaction);


