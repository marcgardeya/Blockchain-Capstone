// migrating the appropriate contracts
var CustomERC721Token = artifacts.require("CustomERC721Token");
var SquareVerifier = artifacts.require("Verifier.sol");
var SolnSquareVerifier = artifacts.require("SolnSquareVerifier.sol");

module.exports = function(deployer,network,accounts) {
  let name = "Some Name";
  let symbol = "SMBL";

  deployer.deploy(CustomERC721Token, name, symbol );
  deployer.deploy(SquareVerifier)
  .then(() => {
    return deployer.deploy(SolnSquareVerifier, SquareVerifier.address, name, symbol );
  }
  )
};
