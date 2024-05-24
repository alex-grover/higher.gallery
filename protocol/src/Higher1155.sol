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
    string public contractURI;
    mapping(uint256 => string) internal _uris;
    mapping(uint256 => uint256) internal _prices;

    function initialize(address owner_, string calldata uri_) external initializer {
        __Ownable_init(owner_);
        _id = 1;
        contractURI = uri_;
    }

    function create(string calldata uri_, uint256 price_) external override onlyOwner returns (uint256) {
        _uris[_id] = uri_;
        _prices[_id] = price_;
        emit Create(_id, uri_, price_);
        return _id++;
    }

    function mint(uint256 id_, uint256 amount_, string calldata comment_) external override {
        uint256 cost = amount_ * _prices[id_];
        HIGHER.transferFrom(msg.sender, address(this), cost);

        uint256 fee = cost / 10;
        HIGHER.transfer(FEE_RECIPIENT, fee);

        _mint(msg.sender, id_, amount_, "");
        emit Mint(id_, msg.sender, amount_, comment_);
    }

    function withdraw() external override onlyOwner {
        uint256 balance = HIGHER.balanceOf(address(this));
        HIGHER.transfer(owner(), balance);
        emit Withdraw(balance);
    }

    function uri(uint256 id_) public view override returns (string memory) {
        return _uris[id_];
    }

    function price(uint256 id_) external view override returns (uint256) {
        return _prices[id_];
    }
}
