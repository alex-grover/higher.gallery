// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IHigher1155Factory {
    event Higher1155Deployed(address indexed creator, address higher1155);

    function deploy(string calldata contractURI) external returns (address);

    function isHigher1155(address higher1155) external view returns (bool);

    function minter() external view returns (address);
}
