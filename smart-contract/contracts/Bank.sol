//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Bank{
    address public BankOwner;
    string public bankName;
    uint withdrawTime;
    mapping (address => uint256) public customerBalance;

constructor(){
    BankOwner= msg.sender;
}

modifier valueRequired{
    require(msg.value!=0, "You need to deposit some amount of money!");
        _;
}

modifier ownerRequired{
    require(msg.sender==BankOwner, "You must be the owner to do this action");
        _;
}
modifier fundsRequired(uint256 _total){
    require(_total <= customerBalance[msg.sender], "You have insufficent funds to withdraw");
    _;
}


function depositMoney() public payable valueRequired {
    customerBalance[msg.sender] += msg.value;
}

function setBankName(string memory _name) external ownerRequired {
    bankName= _name;
}
function withdrawMoney(address payable _to, uint256 _total) public payable fundsRequired(_total) {
    customerBalance[msg.sender] -= _total;
    _to.transfer(_total);
//seems 2 modifiers in 1 function doesn't work
//so I put a require here
     require(block.timestamp >= (withdrawTime + 30 seconds), "You can withdraw only once per 30 seconds");
    withdrawTime= block.timestamp;
}

function getCustomerBalance() external view returns(uint256){
    return customerBalance[msg.sender];
}

function getBankBalance() public view ownerRequired  returns (uint256)  {
    return address(this).balance;
}

}