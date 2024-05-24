// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {OwnableUpgradeable} from "openzeppelin-contracts-upgradeable/contracts/access/OwnableUpgradeable.sol";
import {ERC1155} from "solmate/tokens/ERC1155.sol";
import {IHigher1155} from "src/IHigher1155.sol";
import {IHigherMinter} from "src/IHigherMinter.sol";
import {HigherConstants} from "src/HigherConstants.sol";

/*

higher ↑

*/

contract Higher1155 is IHigher1155, ERC1155, OwnableUpgradeable {
    address internal _minter;
    string internal _contractURI;
    uint256 internal _id;
    mapping(uint256 => string) internal _uris;
    mapping(uint256 => MintConfig) internal _mintConfigs;

    function initialize(address owner, address newMinter, string calldata newContractURI) external initializer {
        __Ownable_init(owner);
        _minter = newMinter;
        _contractURI = newContractURI;
        _id = 1;
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
        IHigherMinter(_minter).mint(msg.sender, amount * _mintConfigs[id].price);
        _mint(msg.sender, id, amount, "");
        emit Mint(id, msg.sender, amount, comment);
    }

    function withdraw() external override onlyOwner {
        uint256 balance = HigherConstants.HigherToken.balanceOf(address(this));
        HigherConstants.HigherToken.transfer(owner(), balance);
        emit Withdraw(balance);
    }

    function contractURI() external view override returns (string memory) {
        return _contractURI;
    }

    function minter() external view override returns (address) {
        return _minter;
    }

    function uri(uint256 id) public view override returns (string memory) {
        return _uris[id];
    }

    function mintConfig(uint256 id) external view override returns (MintConfig memory) {
        return _mintConfigs[id];
    }
}
