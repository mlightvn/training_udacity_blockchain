module.exports = {
    web3Provider: {
      // The endpoint that the server will listen on
      endpoint: 'http://localhost:7545',
      // endpoint: 'ws://localhost:7545',
    },
    // The private key of the sender
    privateKey: 'edba846ecfebf9abb8435071934b211f07e48685084ab458ec4fc1aa8f1245c0',
    // The address of the sender
    sendingAddress: '0xBeE436d17D429BFdaD2491478f77AF656699EA1b',
    // The address of the receiver
    receivingAddress: '0x551D492FEb84c548068A6002E69Cffd3D804Cbe6',

    metamaskAddress: '0x27b5419afb9c3D99A262046383e083Ae7d81900a',

    nonceUInt: 1,
    weiToEtherUnit: 1000000000000000000, // 1,000,000,000,000,000,000 = 1 Ether
}
