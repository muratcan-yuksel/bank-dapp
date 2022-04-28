//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Bank{
    address public BankOwner;
    string public bankName;
    mapping (address => uint256) public customerBalance;

constructor(){
    BankOwner= msg.sender;
}

modifier valueRequired{
    require(msg.value!=0, "You need to deposit some amount of money!");
        _;
}

modifier ownerRequired{
    require(msg.sender==BankOwner, "You must be the owner to set the name of the bank");
        _;
}

function depositMoney() public payable valueRequired {
    customerBalance[msg.sender] += msg.value;
}

function setBankName(string memory _name) external ownerRequired {
    bankName= _name;
}


}