const Fundraiser = artifacts.require("Fundraiser");
const Wallet = artifacts.require("Wallet");

module.exports = function(deployer) {
  deployer.deploy(Fundraiser)
    .then(() => Fundraiser.deployed())
    .then(function() {
      return deployer.deploy(Wallet, Fundraiser.address);
    })
    // .then((_contract) => {
    //   console.log("Wallet deploy: Start")
    //   console.log("Fundraiser: Contract address: ", {from: _contract.address})
    //   deployer.deploy(Wallet, {from: _contract.address});
    //   console.log("Wallet deploy: End")
    // }).catch((err) => {
    //   console.error({err})
    // });
  ;
};
