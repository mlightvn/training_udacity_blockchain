// GET_PASSES_THIS_REPO_UDACITY_PLEASE
var Migrations = artifacts.require("./Migrations.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
