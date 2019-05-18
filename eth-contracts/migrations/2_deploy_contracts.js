// migrating the appropriate contracts
var CustomERC721Token = artifacts.require("CustomERC721Token");
var SquareVerifier = artifacts.require("Verifier.sol");
//var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");

module.exports = function(deployer) {
  deployer.deploy(CustomERC721Token);
  deployer.deploy(SquareVerifier);
  //deployer.deploy(SolnSquareVerifier);
};
