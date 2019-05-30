pragma solidity >=0.4.21 <0.6.0;

import "./ERC721Mintable.sol";
import "../../zokrates/code/square/verifier.sol";

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class

/*
contract Verifier {
   function verifyTx(
            uint[2] memory a,
            uint[2] memory a_p,
            uint[2][2] memory b,
            uint[2] memory b_p,
            uint[2] memory c,
            uint[2] memory c_p,
            uint[2] memory h,
            uint[2] memory k,
            uint[2] memory input
        ) public returns (bool r);
}
*/

contract SolnSquareVerifier is CustomERC721Token {

    Verifier verifierContract;

    constructor(address verifierAddress, string memory name, string memory symbol) CustomERC721Token(name, symbol) public {
        verifierContract = Verifier(verifierAddress);        
        for(uint256 i=1; i<11; i++ ) {
            CustomERC721Token.mint(verifierAddress, i);
        }
    }

    // TODO define a solutions struct that can hold an index & an address

    struct Solution {
        bool valid;
        address origin;
    }

    // TODO define an array of the above struct
    // not needed

    // TODO define a mapping to store unique solutions submitted

    mapping(address => Solution[]) private solutions;
    mapping(bytes32 => bool) private unique;

    // TODO Create an event to emit when a solution is added

    event SolutionAdded(address);

    // TODO Create a function to add the solutions to the array and emit the event

    // check out https://knowledge.udacity.com/questions/39621
    
    function addSolution(
            uint[2] calldata a,
            uint[2] calldata a_p,
            uint[2][2] calldata b,
            uint[2] calldata b_p,
            uint[2] calldata c,
            uint[2] calldata c_p,
            uint[2] calldata h,
            uint[2] calldata k,
            uint[2] calldata input
            ) external
    {
        bytes32 key = keccak256(abi.encodePacked(a, a_p, b, b_p, c, c_p, h, k, input));
        if( !unique[key] ) {
            bool valid = verifierContract.verifyTx(a,a_p,b,b_p,c,c_p,h,k,input);
            unique[key] = true;
            solutions[msg.sender].push( Solution({valid:valid, origin:msg.sender}) );

            emit SolutionAdded(msg.sender);
        }
    }

    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSupply

    function mint(address to, uint256 tokenId) public returns(bool) {

        bool isValid = false;
        for(uint256 s=0; s<solutions[msg.sender].length; s++ ) {
            if( solutions[msg.sender][s].valid == true ) { isValid = true; break; }
        }
        if( !isValid ) { return false; }

        return CustomERC721Token.mint(to, tokenId);
    }
}
