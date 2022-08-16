// SPDX-License-Identifier: MIT
// GET_PASSES_THIS_REPO_UDACITY_PLEASE
pragma solidity >=0.4.21 <0.6.0;

import "./ERC721Mintable.sol";
import "./verifier.sol";

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
// contract Verifier {
//     // TODO define the following public functions
//     // 1. function verify(bytes32[] memory proof, bytes32[] memory inputs, uint256[] memory input_owners, uint256[] memory input_values, uint256 output) public returns (bool)
//     // 2. function get_input_owners(uint256[] memory input_owners, uint256[] memory input_values, uint256 index) public returns (address)
//     // 3. function get_input_values(uint256[] memory input_values, uint256 index) public returns (uint256)
//     // 4. function get_output() public returns (uint256)
//     // function verify(bytes32[] memory proof, bytes32[] memory inputs, uint256[] memory input_owners, uint256[] memory input_values, uint256 output) public returns (bool){
//     //     return <Verifier> (proof, inputs, input_owners, input_values, output);
//     // }
//     // function get_input_owners(uint256[] memory input_owners, uint256[] memory input_values, uint256 index) public returns (address){
//     //     return input_owners[index];
//     // }
//     // function get_input_values(uint256[] memory input_values, uint256 index) public returns (uint256){
//     //     return input_values[index];
//     // }
//     // function get_output() public returns (uint256){
//     //     return <output>;
//     // }
//     function verifyTx(
//         uint256[2] memory a,
//         uint256[2][2] memory b,
//         uint256[2] memory c,
//         uint256[2] memory input
//     ) public returns (bool) {
//         return true;
//     }
// }

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is CustomERC721Token {
    Verifier private verifier;

    constructor(
        address _verifierContractAddress,
        string memory name,
        string memory symbol
    ) public CustomERC721Token(name, symbol) {
        verifier = Verifier(_verifierContractAddress);
    }

    // TODO define the following public functions
    // 1. function verifyProof(bytes32[] memory proof, bytes32[] memory inputs, uint256[] memory input_owners, uint256[] memory input_values, uint256 output) public returns (bool)
    // 2. function get_input_owners(uint256[] memory input_owners, uint256[] memory input_values, uint256 index) public returns (address)
    // 3. function get_input_values(uint256[] memory input_values, uint256 index) public returns (uint256)
    // 4. function get_output() public returns (uint256)
    // function verifyProof(
    //     bytes32[] memory proof,
    //     bytes32[] memory inputs,
    //     uint256[] memory input_owners,
    //     uint256[] memory input_values,
    //     uint256 output
    // ) public pure returns (bool) {
    //     return true;
    // }

    // function get_input_owners(
    //     uint256[] memory input_owners,
    //     uint256[] memory input_values,
    //     uint256 index
    // ) public pure returns (address) {
    //     return address(0x0);
    // }

    // function get_input_values(uint256[] memory input_values, uint256 index)
    //     public
    //     pure
    //     returns (uint256)
    // {
    //     return 0;
    // }

    // function get_output() public pure returns (uint256) {
    //     return 0;
    // }

    // TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint256 index;
        address owner;
    }

    // TODO define an array of the above struct
    Solution[] solutions;

    // TODO define a mapping to store unique solutions submitted
    mapping(uint256 => Solution) uniqueSolutions;

    // TODO Create an event to emit when a solution is added
    event SolutionAdded(
        uint256 indexed solutionIndex,
        address indexed solutionOwner
    );

    // TODO Create a function to add the solutions to the array and emit the event
    function addSolution(
        uint256 solutionIndex,
        address solutionOwner,
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[2] memory inputs
    ) public {
        // require(
        //     uniqueSolutions[solutionIndex].owner != address(0),
        //     "This solution has already been used"
        // );
        bool verified = verifier.verifyTx(a, b, c, inputs);
        // bool verified = true;
        if (verified) {
            Solution memory solution = Solution({
                index: solutionIndex,
                owner: solutionOwner
            });
            solutions.push(solution);
            uniqueSolutions[solutionIndex] = solution;
            emit SolutionAdded(solutionIndex, solutionOwner);
        }
    }

    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    function mintUniqueSolution(
        uint256 solutionIndex,
        address solutionOwner,
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[2] memory inputs
    ) public {
        // require(
        //     solutionIndex == solutions[solutionIndex].index,
        //     "This solution is not valid: wrong index"
        // );
        // require(
        //     solutionOwner == solutions[solutionIndex].owner,
        //     "This solution is not valid: wrong owner"
        // );
        bool verified = verifier.verifyTx(a, b, c, inputs);
        // bool verified = true;
        if (verified) {
            _mint(solutionOwner, solutionIndex);
            uniqueSolutions[solutionIndex].owner = solutionOwner;
        }
    }
}
