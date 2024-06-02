// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import {OwnableUpgradeable} from "openzeppelin-contracts-upgradeable/contracts/access/OwnableUpgradeable.sol";
import {Initializable} from "openzeppelin-contracts-upgradeable/contracts/proxy/utils/Initializable.sol";
import {ERC1155TokenReceiver} from "solmate/tokens/ERC1155.sol";
import {ERC20} from "solmate/tokens/ERC20.sol";
import {IHigher1155} from "src/IHigher1155.sol";
import {Higher1155} from "src/Higher1155.sol";
import {Higher1155Factory} from "src/Higher1155Factory.sol";
import {HigherConstants} from "src/HigherConstants.sol";
import {HigherMinter} from "src/HigherMinter.sol";
import {MockHigher} from "test/MockHigher.sol";

contract Higher1155Test is Test {
    event Create(uint256 id);
    event Mint(uint256 indexed id, address minter, uint256 amount, string comment);

    function test_initialize(address creator, address minter, string calldata contractURI) external {
        vm.assume(creator != address(0));

        Higher1155 higher1155 = new Higher1155();

        higher1155.initialize(creator, minter, contractURI);

        assertEq(higher1155.owner(), creator);
        assertEq(higher1155.contractURI(), contractURI);
        assertEq(higher1155.minter(), minter);
    }

    function test_cannotInitializeTwice(address creator, address minter, string calldata contractURI) external {
        vm.assume(creator != address(0));

        Higher1155 higher1155 = new Higher1155();
        higher1155.initialize(creator, minter, contractURI);

        vm.expectRevert(Initializable.InvalidInitialization.selector);
        higher1155.initialize(creator, minter, contractURI);
    }

    function test_create(
        address creator,
        address minter,
        string calldata contractURI,
        string calldata tokenURI,
        IHigher1155.MintConfig calldata mintConfig,
        string calldata secondUri,
        IHigher1155.MintConfig calldata secondMintConfig
    ) external {
        vm.assume(creator != address(0));

        Higher1155 higher1155 = new Higher1155();
        higher1155.initialize(creator, minter, contractURI);

        vm.expectEmit(address(higher1155));
        emit Create(1);

        vm.prank(creator);
        uint256 firstId = higher1155.create(tokenURI, mintConfig);

        assertEq(firstId, 1);
        assertEq(higher1155.uri(firstId), tokenURI);
        assertEq(higher1155.mintConfig(firstId).price, mintConfig.price);

        // Create a second token to ensure that the id increments properly
        vm.expectEmit(address(higher1155));
        emit Create(2);

        vm.prank(creator);
        uint256 secondId = higher1155.create(secondUri, secondMintConfig);

        assertEq(secondId, 2);
        assertEq(higher1155.uri(secondId), secondUri);
        assertEq(higher1155.mintConfig(secondId).price, secondMintConfig.price);
    }

    function test_cannotCreateAsNonOwner(
        address creator,
        address nonCreator,
        address minter,
        string calldata contractURI,
        string calldata tokenURI,
        IHigher1155.MintConfig calldata mintConfig
    ) external {
        vm.assume(creator != address(0));
        vm.assume(creator != nonCreator);

        Higher1155 higher1155 = new Higher1155();
        higher1155.initialize(creator, minter, contractURI);

        vm.expectRevert(abi.encodeWithSelector(OwnableUpgradeable.OwnableUnauthorizedAccount.selector, nonCreator));
        vm.prank(nonCreator);
        higher1155.create(tokenURI, mintConfig);
    }

    struct MintParams {
        address account;
        uint256 amount;
        string comment;
    }

    function test_mint(
        address creator,
        string calldata contractURI,
        string calldata tokenURI,
        IHigher1155.MintConfig memory mintConfig,
        MintParams memory mintParams
    ) external {
        vm.assume(creator != address(0));
        vm.assume(
            mintParams.account > address(9) && mintParams.account != 0x7109709ECfa91a80626fF3989D68f67F5b1DD12D
                && mintParams.account != CONSOLE && mintParams.account != address(HigherConstants.HigherToken)
        );

        mintConfig.price = bound(mintConfig.price, 0, 3.4028236692e38);
        mintParams.amount = bound(mintParams.amount, 0, 3.4028236692e38);
        mintConfig.maxSupply = bound(mintConfig.maxSupply, mintParams.amount, type(uint256).max);
        vm.warp(mintConfig.endTimestamp);

        Higher1155 higher1155 = new Higher1155();
        Higher1155Factory factory = new Higher1155Factory(makeAddr("higher1155Implementation"));
        vm.mockCall(
            address(factory),
            abi.encodeWithSelector(Higher1155Factory.isHigher1155.selector, address(higher1155)),
            abi.encode(true)
        );
        address minter = factory.minter();
        higher1155.initialize(creator, minter, contractURI);
        MockHigher mockHigher = new MockHigher();
        vm.etch(address(HigherConstants.HigherToken), address(mockHigher).code);
        vm.etch(mintParams.account, type(MockERC1155TokenReceiver).runtimeCode);

        vm.prank(creator);
        uint256 id = higher1155.create(tokenURI, mintConfig);
        MockHigher(address(HigherConstants.HigherToken)).mint(mintParams.account, mintConfig.price * mintParams.amount);
        vm.prank(mintParams.account);
        HigherConstants.HigherToken.approve(minter, mintConfig.price * mintParams.amount);

        vm.expectEmit(address(higher1155));
        emit Mint(id, mintParams.account, mintParams.amount, mintParams.comment);

        vm.prank(mintParams.account);
        higher1155.mint(id, mintParams.amount, mintParams.comment);

        assertEq(higher1155.balanceOf(mintParams.account, id), mintParams.amount);
        assertEq(HigherConstants.HigherToken.balanceOf(mintParams.account), 0);
        assertEq(
            HigherConstants.HigherToken.balanceOf(HigherConstants.FeeRecipient),
            mintConfig.price * mintParams.amount / 10
        );
        assertEq(
            HigherConstants.HigherToken.balanceOf(creator),
            mintConfig.price * mintParams.amount - (mintConfig.price * mintParams.amount / 10)
        );
    }

    function test_mintWithNoMaxSupply(
        address creator,
        string calldata contractURI,
        string calldata tokenURI,
        IHigher1155.MintConfig memory mintConfig,
        MintParams memory mintParams
    ) external {
        vm.assume(creator != address(0));
        vm.assume(
            mintParams.account > address(9) && mintParams.account != 0x7109709ECfa91a80626fF3989D68f67F5b1DD12D
                && mintParams.account != CONSOLE && mintParams.account != address(HigherConstants.HigherToken)
        );

        mintConfig.price = bound(mintConfig.price, 0, 3.4028236692e38);
        mintParams.amount = bound(mintParams.amount, 0, 3.4028236692e38);
        mintConfig.maxSupply = 0;
        vm.warp(mintConfig.endTimestamp);

        Higher1155 higher1155 = new Higher1155();
        Higher1155Factory factory = new Higher1155Factory(makeAddr("higher1155Implementation"));
        vm.mockCall(
            address(factory),
            abi.encodeWithSelector(Higher1155Factory.isHigher1155.selector, address(higher1155)),
            abi.encode(true)
        );
        address minter = factory.minter();
        higher1155.initialize(creator, minter, contractURI);
        MockHigher mockHigher = new MockHigher();
        vm.etch(address(HigherConstants.HigherToken), address(mockHigher).code);
        vm.etch(mintParams.account, type(MockERC1155TokenReceiver).runtimeCode);

        vm.prank(creator);
        uint256 id = higher1155.create(tokenURI, mintConfig);
        MockHigher(address(HigherConstants.HigherToken)).mint(mintParams.account, mintConfig.price * mintParams.amount);
        vm.prank(mintParams.account);
        HigherConstants.HigherToken.approve(minter, mintConfig.price * mintParams.amount);

        vm.expectEmit(address(higher1155));
        emit Mint(id, mintParams.account, mintParams.amount, mintParams.comment);

        vm.prank(mintParams.account);
        higher1155.mint(id, mintParams.amount, mintParams.comment);

        assertEq(higher1155.balanceOf(mintParams.account, id), mintParams.amount);
        assertEq(HigherConstants.HigherToken.balanceOf(mintParams.account), 0);
        assertEq(
            HigherConstants.HigherToken.balanceOf(HigherConstants.FeeRecipient),
            mintConfig.price * mintParams.amount / 10
        );
        assertEq(
            HigherConstants.HigherToken.balanceOf(creator),
            mintConfig.price * mintParams.amount - (mintConfig.price * mintParams.amount / 10)
        );
    }

    function test_mintWithNoEndTimestamp(
        address creator,
        string calldata contractURI,
        string calldata tokenURI,
        IHigher1155.MintConfig memory mintConfig,
        MintParams memory mintParams,
        uint256 timestamp
    ) external {
        vm.assume(creator != address(0));
        vm.assume(
            mintParams.account > address(9) && mintParams.account != 0x7109709ECfa91a80626fF3989D68f67F5b1DD12D
                && mintParams.account != CONSOLE && mintParams.account != address(HigherConstants.HigherToken)
        );

        mintConfig.price = bound(mintConfig.price, 0, 3.4028236692e38);
        mintParams.amount = bound(mintParams.amount, 0, 3.4028236692e38);
        mintConfig.maxSupply = bound(mintConfig.maxSupply, mintParams.amount, type(uint256).max);
        mintConfig.endTimestamp = 0;
        vm.warp(timestamp);

        Higher1155 higher1155 = new Higher1155();
        Higher1155Factory factory = new Higher1155Factory(makeAddr("higher1155Implementation"));
        vm.mockCall(
            address(factory),
            abi.encodeWithSelector(Higher1155Factory.isHigher1155.selector, address(higher1155)),
            abi.encode(true)
        );
        address minter = factory.minter();
        higher1155.initialize(creator, minter, contractURI);
        MockHigher mockHigher = new MockHigher();
        vm.etch(address(HigherConstants.HigherToken), address(mockHigher).code);
        vm.etch(mintParams.account, type(MockERC1155TokenReceiver).runtimeCode);

        vm.prank(creator);
        uint256 id = higher1155.create(tokenURI, mintConfig);
        MockHigher(address(HigherConstants.HigherToken)).mint(mintParams.account, mintConfig.price * mintParams.amount);
        vm.prank(mintParams.account);
        HigherConstants.HigherToken.approve(minter, mintConfig.price * mintParams.amount);

        vm.expectEmit(address(higher1155));
        emit Mint(id, mintParams.account, mintParams.amount, mintParams.comment);

        vm.prank(mintParams.account);
        higher1155.mint(id, mintParams.amount, mintParams.comment);

        assertEq(higher1155.balanceOf(mintParams.account, id), mintParams.amount);
        assertEq(HigherConstants.HigherToken.balanceOf(mintParams.account), 0);
        assertEq(
            HigherConstants.HigherToken.balanceOf(HigherConstants.FeeRecipient),
            mintConfig.price * mintParams.amount / 10
        );
        assertEq(
            HigherConstants.HigherToken.balanceOf(creator),
            mintConfig.price * mintParams.amount - (mintConfig.price * mintParams.amount / 10)
        );
    }

    function test_cannotMintMoreThanMaxSupply(
        address creator,
        address minter,
        string calldata contractURI,
        string calldata tokenURI,
        IHigher1155.MintConfig memory mintConfig,
        uint256 extra,
        string calldata comment
    ) external {
        vm.assume(creator != address(0));
        vm.assume(extra > 0 && extra < type(uint256).max);

        mintConfig.price = bound(mintConfig.price, 0, 3.4028236692e38);
        mintConfig.maxSupply = bound(mintConfig.maxSupply, 1, type(uint256).max - extra);

        Higher1155 higher1155 = new Higher1155();
        higher1155.initialize(creator, minter, contractURI);
        vm.prank(creator);
        uint256 id = higher1155.create(tokenURI, mintConfig);

        vm.expectRevert(IHigher1155.MintLimitReached.selector);
        higher1155.mint(id, mintConfig.maxSupply + extra, comment);
    }

    function test_cannotMintAfterEndTimestamp(
        address creator,
        string calldata contractURI,
        string calldata tokenURI,
        IHigher1155.MintConfig memory mintConfig,
        uint256 amount,
        uint256 timedelta,
        string calldata comment
    ) external {
        vm.assume(creator != address(0));
        vm.assume(timedelta > 0 && timedelta < type(uint256).max);

        mintConfig.price = bound(mintConfig.price, 0, 3.4028236692e38);
        amount = bound(amount, 0, 3.4028236692e38);
        mintConfig.maxSupply = bound(mintConfig.maxSupply, amount, type(uint256).max);
        mintConfig.endTimestamp = bound(mintConfig.endTimestamp, 1, type(uint256).max - timedelta);
        vm.warp(mintConfig.endTimestamp + timedelta);

        Higher1155 higher1155 = new Higher1155();
        higher1155.initialize(creator, makeAddr("minter"), contractURI);
        vm.prank(creator);
        uint256 id = higher1155.create(tokenURI, mintConfig);

        vm.expectRevert(IHigher1155.MintEnded.selector);
        higher1155.mint(id, amount, comment);
    }
}

contract MockERC1155TokenReceiver is ERC1155TokenReceiver {}
