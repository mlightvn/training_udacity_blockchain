// pragma solidity ^0.8.15;
pragma solidity ^0.5.16;

// INSECURE
contract Auction {
    address currentLeader;
    uint256 highestBid;

    function bid() public payable {
        require(msg.value > highestBid);

        require(currentLeader.send(highestBid)); // Refund the old leader, if it fails then revert

        currentLeader = msg.sender;
        highestBid = msg.value;
    }
}
