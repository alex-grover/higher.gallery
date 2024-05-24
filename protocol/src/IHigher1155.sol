// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IHigher1155 {
    event Create(uint256 id, string uri, uint256 price);
    event Mint(uint256 indexed id, address minter, uint256 amount, string comment);
    event Withdraw(uint256 amount);

    function initialize(address owner_, string calldata uri_) external;

    function create(string calldata uri_, uint256 price_) external returns (uint256);

    function mint(uint256 id_, uint256 amount_, string calldata comment_) external;

    function withdraw() external;

    function contractURI() external view returns (string memory);

    function price(uint256 id_) external view returns (uint256);
}
