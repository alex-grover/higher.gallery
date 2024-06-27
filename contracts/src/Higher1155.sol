// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {IERC20Permit} from "openzeppelin-contracts/contracts/token/ERC20/extensions/IERC20Permit.sol";
import {UUPSUpgradeable} from "openzeppelin-contracts/contracts/proxy/utils/UUPSUpgradeable.sol";
import {OwnableUpgradeable} from "openzeppelin-contracts-upgradeable/contracts/access/OwnableUpgradeable.sol";
import {ERC1155} from "solmate/tokens/ERC1155.sol";
import {IHigher1155, MintConfig} from "src/IHigher1155.sol";
import {IHigher1155Factory} from "src/IHigher1155Factory.sol";

/*

higher, together ↑

*/

contract Higher1155 is IHigher1155, ERC1155, OwnableUpgradeable, UUPSUpgradeable {
    address internal _factory;
    string internal _contractURI;
    uint256 internal _nextId;
    mapping(uint256 id => string uri) internal _uris;
    mapping(uint256 id => MintConfig mintConfig) internal _mintConfigs;
    mapping(uint256 id => uint256 mintCount) internal _mintCounts;

    function initialize(address owner, string calldata contractURI_) external initializer {
        __Ownable_init(owner);
        _factory = msg.sender;
        _contractURI = contractURI_;
        _nextId = 1;
    }

    function create(string calldata uri_, MintConfig calldata mintConfig_) external override returns (uint256) {
        if (msg.sender != _factory && msg.sender != owner()) {
            revert UnauthorizedCreator(msg.sender);
        }

        _uris[_nextId] = uri_;
        _mintConfigs[_nextId] = mintConfig_;

        emit Create(_nextId);

        return _nextId++;
    }

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
    ) external override {
        IERC20Permit(IHigher1155Factory(_factory).higherToken()).permit(owner, spender, value, deadline, v, r, s);
        mint(id, amount, comment);
    }

    function mint(uint256 id, uint256 amount, string calldata comment) public override {
        if (_mintConfigs[id].maxSupply != 0 && _mintCounts[id] + amount > _mintConfigs[id].maxSupply) {
            revert MaxSupplyExceeded(_mintCounts[id], amount, _mintConfigs[id].maxSupply);
        }
        if (_mintConfigs[id].endTimestamp != 0 && block.timestamp > _mintConfigs[id].endTimestamp) {
            revert MintEnded(block.timestamp, _mintConfigs[id].endTimestamp);
        }

        IHigher1155Factory(_factory).transferPayment(msg.sender, owner(), amount * _mintConfigs[id].price);

        _mintCounts[id] += amount;
        _mint(msg.sender, id, amount, "");

        emit Mint(id, msg.sender, amount, comment);
    }

    function factory() external view override returns (address) {
        return _factory;
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

    function _authorizeUpgrade(address) internal override onlyOwner {}
}
