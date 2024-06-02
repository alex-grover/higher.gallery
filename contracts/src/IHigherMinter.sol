// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IHigherMinter {
    event Mint(address creator, uint256 earnings);

    function mint(address account, address creator, uint256 cost) external;
}
