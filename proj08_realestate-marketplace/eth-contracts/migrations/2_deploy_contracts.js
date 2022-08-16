// GET_PASSES_THIS_REPO_UDACITY_PLEASE
// migrating the appropriate contracts

// var CustomERC721Token = artifacts.require("./ERC721Mintable.sol");
var CustomERC721Token = artifacts.require("CustomERC721Token");
var Verifier = artifacts.require("./verifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");

module.exports = async function(deployer) {
  const CONTRACT_NAME = "NguyenNam RealEstate Marketplace"
  const CONTRACT_SYMBOL = "NNRM"
  // const CONTRACT_BASE_TOKEN_URI = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"

  await deployer.deploy(CustomERC721Token, CONTRACT_NAME, CONTRACT_SYMBOL);
  await deployer.deploy(Verifier);
  await deployer.deploy(SolnSquareVerifier, Verifier.address, CONTRACT_NAME, CONTRACT_SYMBOL);
};
