// GET_PASSES_THIS_REPO_UDACITY_PLEASE
pragma solidity >=0.4.21 <0.6.0;

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
contract Verifier {
    // TODO define the following public functions
    // 1. function verify(bytes32[] memory proof, bytes32[] memory inputs, uint256[] memory input_owners, uint256[] memory input_values, uint256 output) public returns (bool)
    // 2. function get_input_owners(uint256[] memory input_owners, uint256[] memory input_values, uint256 index) public returns (address)
    // 3. function get_input_values(uint256[] memory input_values, uint256 index) public returns (uint256)
    // 4. function get_output() public returns (uint256)
}

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier {
    // TODO define the following public functions
    // 1. function verifyProof(bytes32[] memory proof, bytes32[] memory inputs, uint256[] memory input_owners, uint256[] memory input_values, uint256 output) public returns (bool)
    // 2. function get_input_owners(uint256[] memory input_owners, uint256[] memory input_values, uint256 index) public returns (address)
    // 3. function get_input_values(uint256[] memory input_values, uint256 index) public returns (uint256)
    // 4. function get_output() public returns (uint256)
}

// TODO define a solutions struct that can hold an index & an address
struct Solution {
    uint256 index;
    address owner;
}

// TODO define an array of the above struct

// TODO define a mapping to store unique solutions submitted

// TODO Create an event to emit when a solution is added

// TODO Create a function to add the solutions to the array and emit the event

// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly
