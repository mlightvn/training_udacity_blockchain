const { ECPairFactory} = require('ecpair');
const tinysecp = require('tiny-secp256k1');
const crypto = require('crypto');

const ECPair = ECPairFactory(tinysecp);

module.exports = {
    // SHA256: require('crypto-js/sha256'),
    // hex2ascii: require('hex2ascii'),
    // cloneDeep: require('clone-deep'),
    // bitcoinMessage: require('bitcoinjs-message'),
    genesis: () => {
      return {
        body: {
          address: 0x000,
          description: 'Genesis Block',
          star: 0,
        }
      }
    },
    getCurrentTimeStamp: () => {
      let s = new Date().getTime().toString().slice(0, -3);
      return parseInt(s);
    },

    /*
    * Reference:
    *   https://github.com/bitcoinjs/ecpair
    *
    * From WIF
    * const keyPair1 = ECPair.fromWIF('KynD8ZKdViVo5W82oyxvE18BbG6nZPVQ8Td8hYbwU94RmyUALUik');
    * 
    * Random private key
    * const keyPair2 = ECPair.fromPrivateKey(crypto.randomBytes(32));
    * 
    * OR (uses randombytes library, compatible with browser)
    * const keyPair3 = ECPair.makeRandom();
    * 
    */
    keyPair: () => {
      return ECPair.makeRandom();
    },

    randomBytes: (bytes) => {
      return crypto.randomBytes(bytes);
    },
    extraEntropy: {
      extraEntropy: crypto.randomBytes(32)
    },
    segwitTypeP2sh: {
      segwitType: 'p2sh(p2wpkh)'
    },
    segwitType: {
      segwitType: 'p2wpkh'
    },
};
