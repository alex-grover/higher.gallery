// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {OwnableUpgradeable} from "openzeppelin-contracts-upgradeable/contracts/access/OwnableUpgradeable.sol";
import {ERC1155} from "solmate/tokens/ERC1155.sol";
import {IHigher1155} from "src/IHigher1155.sol";

contract Higher1155 is IHigher1155, ERC1155, OwnableUpgradeable {
    uint256 internal _id;
    string public contractURI;
    mapping(uint256 => string) internal _uris;

    function initialize(address owner_, string calldata uri_) external initializer {
        __Ownable_init(owner_);
        _id = 1;
        contractURI = uri_;
    }

    function create(string calldata uri_) external override onlyOwner returns (uint256) {
        _uris[_id] = uri_;
        emit Create(_id, uri_);
        return _id++;
    }

    function mint(uint256 id_, uint256 amount_, string calldata comment_) external override {
        _mint(msg.sender, id_, amount_, "");
        emit Mint(id_, amount_, comment_);
    }

    function uri(uint256 id_) public view override returns (string memory) {
        return _uris[id_];
    }
}
