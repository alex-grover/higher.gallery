// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import {OwnableUpgradeable} from "openzeppelin-contracts-upgradeable/contracts/access/OwnableUpgradeable.sol";
import {Initializable} from "openzeppelin-contracts-upgradeable/contracts/proxy/utils/Initializable.sol";
import {ERC1155TokenReceiver} from "solmate/tokens/ERC1155.sol";
import {ERC20} from "solmate/tokens/ERC20.sol";
import {IHigher1155} from "src/IHigher1155.sol";
import {Higher1155} from "src/Higher1155.sol";

address constant HIGHER = 0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe;

contract Higher1155Test is Test {
    event Create(uint256 id);
    event Mint(uint256 indexed id, address minter, uint256 amount, string comment);
    event Withdraw(uint256 amount);

    function test_initialize(address creator, string calldata contractURI) external {
        vm.assume(creator != address(0));

        Higher1155 higher1155 = new Higher1155();

        higher1155.initialize(creator, contractURI);

        assertEq(higher1155.owner(), creator);
        assertEq(higher1155.contractURI(), contractURI);
    }

    function test_cannotInitializeTwice(address creator, string calldata contractURI) external {
        vm.assume(creator != address(0));

        Higher1155 higher1155 = new Higher1155();
        higher1155.initialize(creator, contractURI);

        vm.expectRevert(Initializable.InvalidInitialization.selector);
        higher1155.initialize(creator, contractURI);
    }

    function test_create(
        address creator,
        string calldata contractURI,
        string calldata tokenURI,
        IHigher1155.MintConfig calldata mintConfig,
        string calldata secondUri,
        IHigher1155.MintConfig calldata secondMintConfig
    ) external {
        vm.assume(creator != address(0));

        Higher1155 higher1155 = new Higher1155();
        higher1155.initialize(creator, contractURI);

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
        string calldata contractURI,
        string calldata tokenURI,
        IHigher1155.MintConfig calldata mintConfig
    ) external {
        vm.assume(creator != address(0));
        vm.assume(creator != nonCreator);

        Higher1155 higher1155 = new Higher1155();
        higher1155.initialize(creator, contractURI);

        vm.expectRevert(abi.encodeWithSelector(OwnableUpgradeable.OwnableUnauthorizedAccount.selector, nonCreator));
        vm.prank(nonCreator);
        higher1155.create(tokenURI, mintConfig);
    }

    function test_mint(
        address creator,
        string calldata contractURI,
        string calldata tokenURI,
        IHigher1155.MintConfig memory mintConfig,
        address minter,
        uint256 amount,
        string calldata comment
    ) external {
        vm.assume(creator != address(0));
        vm.assume(minter > address(9));
        mintConfig.price = bound(mintConfig.price, 0, 3.4028236692e38);
        amount = bound(amount, 0, 3.4028236692e38);

        Higher1155 higher1155 = new Higher1155();
        higher1155.initialize(creator, contractURI);
        MockHigher mockHigher = new MockHigher();
        vm.etch(HIGHER, address(mockHigher).code);
        vm.etch(minter, type(Minter).runtimeCode);

        vm.prank(creator);
        uint256 id = higher1155.create(tokenURI, mintConfig);
        MockHigher(HIGHER).mint(minter, mintConfig.price * amount);
        vm.prank(minter);
        MockHigher(HIGHER).approve(address(higher1155), mintConfig.price * amount);

        vm.expectEmit(address(higher1155));
        emit Mint(id, minter, amount, comment);

        vm.prank(minter);
        higher1155.mint(id, amount, comment);

        assertEq(higher1155.balanceOf(minter, id), amount);
        assertEq(MockHigher(HIGHER).balanceOf(minter), 0);
        assertEq(MockHigher(HIGHER).balanceOf(address(0)), mintConfig.price * amount / 10);
        assertEq(
            MockHigher(HIGHER).balanceOf(address(higher1155)),
            mintConfig.price * amount - (mintConfig.price * amount / 10)
        );
    }

    function test_withdraw(address creator, string calldata contractURI, uint256 amount) external {
        vm.assume(creator != address(0));

        Higher1155 higher1155 = new Higher1155();
        higher1155.initialize(creator, contractURI);
        MockHigher mockHigher = new MockHigher();
        vm.etch(HIGHER, address(mockHigher).code);
        MockHigher(HIGHER).mint(address(higher1155), amount);

        vm.expectEmit(address(higher1155));
        emit Withdraw(amount);

        vm.prank(creator);
        higher1155.withdraw();

        assertEq(MockHigher(HIGHER).balanceOf(creator), amount);
    }

    function test_cannotWithdrawAsNonOwner(address creator, address nonCreator, string calldata contractURI) external {
        vm.assume(creator != address(0));
        vm.assume(creator != nonCreator);

        Higher1155 higher1155 = new Higher1155();
        higher1155.initialize(creator, contractURI);

        vm.expectRevert(abi.encodeWithSelector(OwnableUpgradeable.OwnableUnauthorizedAccount.selector, nonCreator));
        vm.prank(nonCreator);
        higher1155.withdraw();
    }
}

contract Minter is ERC1155TokenReceiver {}

contract MockHigher is ERC20 {
    constructor() ERC20("MockHigher", "MH", 18) {}

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}
