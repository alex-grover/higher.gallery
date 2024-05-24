// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import {OwnableUpgradeable} from "openzeppelin-contracts-upgradeable/contracts/access/OwnableUpgradeable.sol";
import {Initializable} from "openzeppelin-contracts-upgradeable/contracts/proxy/utils/Initializable.sol";
import {ERC1155TokenReceiver} from "solmate/tokens/ERC1155.sol";
import {ERC20} from "solmate/tokens/ERC20.sol";
import {Higher1155} from "src/Higher1155.sol";

address constant HIGHER = 0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe;

contract Higher1155Test is Test {
    event Create(uint256 id, string uri, uint256 price);
    event Mint(uint256 indexed id, address minter, uint256 amount, string comment);
    event Withdraw(uint256 amount);

    function test_initialize(address creator_, string calldata uri_) external {
        vm.assume(creator_ != address(0));

        Higher1155 higher1155 = new Higher1155();

        higher1155.initialize(creator_, uri_);

        assertEq(higher1155.owner(), creator_);
        assertEq(higher1155.contractURI(), uri_);
    }

    function test_cannotInitializeTwice(address creator_, string calldata uri_) external {
        vm.assume(creator_ != address(0));

        Higher1155 higher1155 = new Higher1155();
        higher1155.initialize(creator_, uri_);

        vm.expectRevert(Initializable.InvalidInitialization.selector);
        higher1155.initialize(creator_, uri_);
    }

    function test_create(
        address creator_,
        string calldata contractURI_,
        string calldata uri_,
        uint256 price_,
        string calldata secondUri_,
        uint256 secondPrice_
    ) external {
        vm.assume(creator_ != address(0));

        Higher1155 higher1155 = new Higher1155();
        higher1155.initialize(creator_, contractURI_);

        vm.expectEmit(address(higher1155));
        emit Create(1, uri_, price_);

        vm.prank(creator_);
        uint256 firstId = higher1155.create(uri_, price_);

        assertEq(firstId, 1);
        assertEq(higher1155.uri(firstId), uri_);
        assertEq(higher1155.price(firstId), price_);

        // Create a second token to ensure that the id increments properly
        vm.expectEmit(address(higher1155));
        emit Create(2, secondUri_, secondPrice_);

        vm.prank(creator_);
        uint256 secondId = higher1155.create(secondUri_, secondPrice_);

        assertEq(secondId, 2);
        assertEq(higher1155.uri(secondId), secondUri_);
        assertEq(higher1155.price(secondId), secondPrice_);
    }

    function test_cannotCreateAsNonOwner(
        address creator_,
        address nonCreator_,
        string calldata contractURI_,
        string calldata uri_,
        uint256 price_
    ) external {
        vm.assume(creator_ != address(0));
        vm.assume(creator_ != nonCreator_);

        Higher1155 higher1155 = new Higher1155();
        higher1155.initialize(creator_, contractURI_);

        vm.expectRevert(abi.encodeWithSelector(OwnableUpgradeable.OwnableUnauthorizedAccount.selector, nonCreator_));
        vm.prank(nonCreator_);
        higher1155.create(uri_, price_);
    }

    function test_mint(
        address creator_,
        string calldata contractURI_,
        string calldata uri_,
        uint256 price_,
        address minter_,
        uint256 amount_,
        string calldata comment_
    ) external {
        vm.assume(creator_ != address(0));
        vm.assume(minter_ > address(9));
        price_ = bound(price_, 0, type(uint256).max / 10000);
        amount_ = bound(amount_, 0, 10000);

        Higher1155 higher1155 = new Higher1155();
        higher1155.initialize(creator_, contractURI_);
        MockHigher mockHigher = new MockHigher();
        vm.etch(HIGHER, address(mockHigher).code);
        vm.etch(minter_, type(Minter).runtimeCode);

        vm.prank(creator_);
        uint256 id = higher1155.create(uri_, price_);
        MockHigher(HIGHER).mint(minter_, price_ * amount_);
        vm.prank(minter_);
        MockHigher(HIGHER).approve(address(higher1155), price_ * amount_);

        vm.expectEmit(address(higher1155));
        emit Mint(id, minter_, amount_, comment_);

        vm.prank(minter_);
        higher1155.mint(id, amount_, comment_);

        assertEq(higher1155.balanceOf(minter_, id), amount_);
        assertEq(MockHigher(HIGHER).balanceOf(minter_), 0);
        assertEq(MockHigher(HIGHER).balanceOf(address(0)), price_ * amount_ / 10);
        assertEq(MockHigher(HIGHER).balanceOf(address(higher1155)), price_ * amount_ - (price_ * amount_ / 10));
    }

    function test_withdraw(address creator_, string calldata contractURI_, uint256 amount_) external {
        vm.assume(creator_ != address(0));

        Higher1155 higher1155 = new Higher1155();
        higher1155.initialize(creator_, contractURI_);
        MockHigher mockHigher = new MockHigher();
        vm.etch(HIGHER, address(mockHigher).code);
        MockHigher(HIGHER).mint(address(higher1155), amount_);

        vm.expectEmit(address(higher1155));
        emit Withdraw(amount_);

        vm.prank(creator_);
        higher1155.withdraw();

        assertEq(MockHigher(HIGHER).balanceOf(creator_), amount_);
    }

    function test_cannotWithdrawAsNonOwner(address creator_, address nonCreator_, string calldata contractURI_)
        external
    {
        vm.assume(creator_ != address(0));
        vm.assume(creator_ != nonCreator_);

        Higher1155 higher1155 = new Higher1155();
        higher1155.initialize(creator_, contractURI_);

        vm.expectRevert(abi.encodeWithSelector(OwnableUpgradeable.OwnableUnauthorizedAccount.selector, nonCreator_));
        vm.prank(nonCreator_);
        higher1155.withdraw();
    }
}

contract Minter is ERC1155TokenReceiver {}

contract MockHigher is ERC20 {
    constructor() ERC20("MockHigher", "MH", 18) {}

    function mint(address to_, uint256 amount_) external {
        _mint(to_, amount_);
    }
}
