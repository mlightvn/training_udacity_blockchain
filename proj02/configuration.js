require('dotenv').config();

module.exports = {
    web3Provider: {
      // The endpoint that the server will listen on
      endpoint: 'http://localhost:7545',
      // endpoint: 'ws://localhost:7545',
    },
    // The private key of the sender
    privateKey: process.env.SENDER_PRIVATE_KEY,
    // The address of the sender
    sendingAddress: process.env.SENDER_ADDRESS,
    // The address of the receiver
    receivingAddress: process.env.RECEIVER_ADDRESS,

    metamaskAddress: process.env.METAMASK_ADDRESS, // '0x27b5419afb9c3D99A262046383e083Ae7d81900a'

    nonceUInt: 1,
    weiToEtherUnit: 1000000000000000000, // 1,000,000,000,000,000,000 = 1 Ether
}
