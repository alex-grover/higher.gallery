// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

struct MintConfig {
    uint256 price;
    uint256 maxSupply;
    uint256 endTimestamp;
}

interface IHigher1155 {
    event Create(uint256 id);
    event Mint(uint256 indexed id, address minter, uint256 amount, string comment);

    error UnauthorizedCreator(address msgSender);
    error MaxSupplyExceeded(uint256 mintCount, uint256 amount, uint256 maxSupply);
    error MintEnded(uint256 timestamp, uint256 endTimestamp);

    function initialize(address owner, string calldata contractURI) external;

    function create(string calldata uri, MintConfig calldata mintConfig) external returns (uint256 id);

    function approveAndMint(
        address owner,
        address spender,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s,
        uint256 id,
        uint256 amount,
        string calldata comment
    ) external;

    function mint(uint256 id, uint256 amount, string calldata comment) external;

    function factory() external view returns (address);

    function contractURI() external view returns (string memory);

    function mintConfig(uint256 id) external view returns (MintConfig memory);
}
