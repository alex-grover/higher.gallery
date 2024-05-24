// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {IERC20} from "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import {OwnableUpgradeable} from "openzeppelin-contracts-upgradeable/contracts/access/OwnableUpgradeable.sol";
import {ERC1155} from "solmate/tokens/ERC1155.sol";
import {IHigher1155} from "src/IHigher1155.sol";

/*

higher ↑

*/

IERC20 constant HIGHER = IERC20(0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe);
address constant FEE_RECIPIENT = address(0); // TODO

contract Higher1155 is IHigher1155, ERC1155, OwnableUpgradeable {
    uint256 internal _id;
    string internal _contractURI;
    mapping(uint256 => string) internal _uris;
    mapping(uint256 => MintConfig) internal _mintConfigs;

    function initialize(address owner, string calldata newContractURI) external initializer {
        __Ownable_init(owner);
        _id = 1;
        _contractURI = newContractURI;
    }

    function create(string calldata tokenURI, MintConfig calldata newMintConfig)
        external
        override
        onlyOwner
        returns (uint256)
    {
        _uris[_id] = tokenURI;
        _mintConfigs[_id] = newMintConfig;
        emit Create(_id);
        return _id++;
    }

    function mint(uint256 id, uint256 amount, string calldata comment) external override {
        uint256 cost = amount * _mintConfigs[id].price;
        HIGHER.transferFrom(msg.sender, address(this), cost);

        uint256 fee = cost / 10;
        HIGHER.transfer(FEE_RECIPIENT, fee);

        _mint(msg.sender, id, amount, "");
        emit Mint(id, msg.sender, amount, comment);
    }

    function withdraw() external override onlyOwner {
        uint256 balance = HIGHER.balanceOf(address(this));
        HIGHER.transfer(owner(), balance);
        emit Withdraw(balance);
    }

    function contractURI() external view override returns (string memory) {
        return _contractURI;
    }

    function uri(uint256 id) public view override returns (string memory) {
        return _uris[id];
    }

    function mintConfig(uint256 id) external view override returns (MintConfig memory) {
        return _mintConfigs[id];
    }
}
