// require('dotenv').config();

module.exports = {
  web3Provider: {
      // The endpoint that the server will listen on
      // endpoint: "http://localhost:7545",
      // endpoint_ws: "ws://127.0.0.1:7545",

      // endpoint: process.env.ENDPOINT,
      // endpoint_ws: process.env.ENDPOINT_WS,
  
  },
  // The private key of the sender
  privateKey: "",
  // The address of the sender
  sendingAddress: "",
  // The address of the receiver
  receivingAddress: "",

  metamaskAddress: '',

  nonceUInt: 1,
  weiToEtherUnit: 1000000000000000000, // 1,000,000,000,000,000,000 = 1 Ether
}
