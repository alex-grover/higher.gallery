// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IHigher1155 {
    struct MintConfig {
        uint256 price;
    }

    event Create(uint256 id);
    event Mint(uint256 indexed id, address minter, uint256 amount, string comment);
    event Withdraw(uint256 amount);

    function initialize(address owner, string calldata contractURI) external;

    function create(string calldata tokenURI, MintConfig calldata config) external returns (uint256);

    function mint(uint256 id, uint256 amount, string calldata comment) external;

    function withdraw() external;

    function contractURI() external view returns (string memory);

    function mintConfig(uint256 id) external view returns (MintConfig memory);
}
