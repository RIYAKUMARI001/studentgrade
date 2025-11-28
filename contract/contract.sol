// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentGrade {

    mapping(address => uint256) private grades;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only teacher can set grade");
        _;
    }

    function setGrade(address student, uint256 grade) external onlyOwner {
        require(grade <= 100, "Grade must be 0-100");
        grades[student] = grade;
    }

    function getGrade(address student) external view returns (uint256) {
        return grades[student];
    }
}
