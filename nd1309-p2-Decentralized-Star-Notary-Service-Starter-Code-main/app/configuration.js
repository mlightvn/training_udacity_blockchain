require('dotenv').config();

module.exports = {
    web3Provider: {
      // The endpoint that the server will listen on
      endpoint: process.env.ENDPOINT,
      endpoint_ws: process.env.ENDPOINT_WS,
    },
    // The private key of the sender
    privateKey: process.env.SENDER_PRIVATE_KEY,
    // The address of the sender
    sendingAddress: process.env.SENDER_ADDRESS,
    // The address of the receiver
    receivingAddress: process.env.RECEIVER_ADDRESS,

    metamaskAddress: process.env.METAMASK_ADDRESS, // '0x0000000000000000000000000000000000000000'

    nonceUInt: 1,
    weiToEtherUnit: 1000000000000000000, // 1,000,000,000,000,000,000 = 1 Ether
}
