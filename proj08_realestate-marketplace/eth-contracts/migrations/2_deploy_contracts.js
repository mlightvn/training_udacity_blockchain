// GET_PASSES_THIS_REPO_UDACITY_PLEASE
// migrating the appropriate contracts

// var SquareVerifier = artifacts.require("./SquareVerifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");

module.exports = function(deployer) {
  // deployer.deploy(SquareVerifier);
  deployer.deploy(SolnSquareVerifier);
};
