// Reference
//   https://openbase.com/js/ethereumjs-tx/documentation

let configuration = require('./configuration.js');

const EthereumTx = require('ethereumjs-tx').Transaction
const privateKey = Buffer.from(
  configuration.privateKeySender,
  'hex',
)

const txParams = {
  nonce: '0x00',
  gasPrice: '0x09184e72a000',
  gasLimit: '0x2710',
  to: '0x0000000000000000000000000000000000000000',
  value: '0x00',
  data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057',
}

// The second parameter is not necessary if these values are used
const tx = new EthereumTx(txParams, { chain: 'mainnet', hardfork: 'petersburg' })
tx.sign(privateKey)
const serializedTx = tx.serialize()
console.log(serializedTx.toString('hex'))

