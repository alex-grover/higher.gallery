// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IHigherMinter {
    function mint(address account, uint256 cost) external;
}
