let configuration = require('./configuration.js');

const Web3 = require('web3');
let web3 = new Web3(configuration.web3Provider.endpoint_ws);
web3.eth.getChainId().then(function(chainId){
	console.log(chainId);
});
