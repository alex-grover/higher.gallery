// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IHigher1155 {
    event Create(uint256 id, string uri);
    event Mint(uint256 indexed id, uint256 amount, string comment);

    function initialize(address owner_, string calldata uri_) external;

    function create(string calldata uri_) external returns (uint256);

    function mint(uint256 id_, uint256 amount_, string calldata comment_) external;

    function contractURI() external view returns (string memory);
}
