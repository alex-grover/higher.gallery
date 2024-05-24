// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import {OwnableUpgradeable} from "openzeppelin-contracts-upgradeable/contracts/access/OwnableUpgradeable.sol";
import {Initializable} from "openzeppelin-contracts-upgradeable/contracts/proxy/utils/Initializable.sol";
import {ERC1155TokenReceiver} from "solmate/tokens/ERC1155.sol";
import {Higher1155} from "src/Higher1155.sol";

contract Higher1155Test is Test {
    event Create(uint256 id, string uri);
    event Mint(uint256 indexed id, uint256 amount, string comment);

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
        string calldata secondUri_
    ) external {
        vm.assume(creator_ != address(0));

        Higher1155 higher1155 = new Higher1155();
        higher1155.initialize(creator_, contractURI_);

        vm.expectEmit(address(higher1155));
        emit Create(1, uri_);

        vm.prank(creator_);
        uint256 firstId = higher1155.create(uri_);

        assertEq(firstId, 1);
        assertEq(higher1155.uri(firstId), uri_);

        // Create a second token to ensure that the id increments properly
        vm.expectEmit(address(higher1155));
        emit Create(2, secondUri_);

        vm.prank(creator_);
        uint256 secondId = higher1155.create(secondUri_);

        assertEq(secondId, 2);
        assertEq(higher1155.uri(secondId), secondUri_);
    }

    function test_cannotCreateAsNonOwner(
        address creator_,
        address nonCreator_,
        string calldata contractURI_,
        string calldata uri_
    ) external {
        vm.assume(creator_ != address(0));
        vm.assume(creator_ != nonCreator_);

        Higher1155 higher1155 = new Higher1155();
        higher1155.initialize(creator_, contractURI_);

        vm.expectRevert(abi.encodeWithSelector(OwnableUpgradeable.OwnableUnauthorizedAccount.selector, nonCreator_));
        vm.prank(nonCreator_);
        higher1155.create(uri_);
    }

    function test_mint(
        address creator_,
        string calldata contractURI_,
        string calldata uri_,
        address minter_,
        uint256 amount_,
        string calldata comment_
    ) external {
        vm.assume(creator_ != address(0));
        vm.assume(minter_ > address(9));

        Higher1155 higher1155 = new Higher1155();
        higher1155.initialize(creator_, contractURI_);
        vm.etch(minter_, type(Minter).runtimeCode);

        vm.prank(creator_);
        uint256 id = higher1155.create(uri_);

        vm.expectEmit(address(higher1155));
        emit Mint(id, amount_, comment_);

        vm.prank(minter_);
        higher1155.mint(id, amount_, comment_);

        assertEq(higher1155.balanceOf(minter_, id), amount_);
    }
}

contract Minter is ERC1155TokenReceiver {}
