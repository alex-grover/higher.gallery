// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import {OwnableUpgradeable} from "openzeppelin-contracts-upgradeable/contracts/access/OwnableUpgradeable.sol";
import {Clones} from "openzeppelin-contracts/contracts/proxy/Clones.sol";
import {IERC1155MetadataURI} from "openzeppelin-contracts/contracts/token/ERC1155/extensions/IERC1155MetadataURI.sol";
import {Higher1155} from "src/Higher1155.sol";
import {Higher1155Factory} from "src/Higher1155Factory.sol";
import {IHigher1155, MintConfig} from "src/IHigher1155.sol";
import {IHigher1155Factory} from "src/IHigher1155Factory.sol";
import {MockHigherToken} from "test/MockHigherToken.sol";

contract Higher1155FactoryTest is Test {
    Higher1155Factory internal _factory;

    event Higher1155Deployed(address indexed creator, address higher1155);
    event PaymentTransferred(address indexed to, uint256 proceeds);

    function setUp() public {
        Higher1155 higher1155Implementation = new Higher1155();
        MockHigherToken higherToken = new MockHigherToken();

        _factory = new Higher1155Factory(
            address(higher1155Implementation),
            address(higherToken),
            makeAddr("higherCollective"),
            makeAddr("feeRecipient")
        );
    }

    function test_constructor() external {
        address higher1155Implementation = makeAddr("higher1155Implementation");
        address higherToken = makeAddr("higherToken");
        address higherCollective = makeAddr("higherCollective");
        address feeRecipient = makeAddr("feeRecipient");

        Higher1155Factory factory =
            new Higher1155Factory(higher1155Implementation, higherToken, higherCollective, feeRecipient);

        assertEq(factory.higher1155Implementation(), higher1155Implementation);
        assertEq(factory.higherToken(), higherToken);
        assertEq(factory.higherCollective(), higherCollective);
        assertEq(factory.feeRecipient(), feeRecipient);
    }

    function test_deploy(
        address creator,
        string calldata contractURI,
        string calldata tokenURI,
        MintConfig calldata mintConfig
    ) external {
        vm.assume(creator != address(0));

        address predictedAddress = Clones.predictDeterministicAddress(
            _factory.higher1155Implementation(), keccak256(abi.encodePacked(creator, contractURI)), address(_factory)
        );

        vm.expectEmit(address(_factory));
        emit Higher1155Deployed(creator, predictedAddress);

        vm.prank(creator);
        address higher1155 = _factory.deploy(contractURI, tokenURI, mintConfig);

        this.assertCloneCode(higher1155.code, _factory.higher1155Implementation());
        assertEq(OwnableUpgradeable(higher1155).owner(), creator);
        assertEq(IHigher1155(higher1155).factory(), address(_factory));
        assertEq(IHigher1155(higher1155).contractURI(), contractURI);
        assertEq(IERC1155MetadataURI(higher1155).uri(1), tokenURI);
        assertEq(IHigher1155(higher1155).mintConfig(1).price, mintConfig.price);
        assertEq(IHigher1155(higher1155).mintConfig(1).maxSupply, mintConfig.maxSupply);
        assertEq(IHigher1155(higher1155).mintConfig(1).endTimestamp, mintConfig.endTimestamp);
    }

    function test_transferPayment(
        string calldata contractURI,
        string calldata tokenURI,
        MintConfig calldata mintConfig,
        address from,
        address to,
        uint256 value
    ) external {
        vm.assume(
            from != to && from != _factory.higherCollective() && from != _factory.feeRecipient()
                && to != _factory.higherCollective() && to != _factory.feeRecipient()
        );

        address higher1155 = _factory.deploy(contractURI, tokenURI, mintConfig);

        MockHigherToken higherToken = MockHigherToken(_factory.higherToken());
        higherToken.mint(from, value);

        vm.prank(from);
        higherToken.approve(address(_factory), value);

        vm.expectEmit(address(_factory));
        emit PaymentTransferred(to, value - (value / 20) * 2);

        vm.prank(higher1155);
        _factory.transferPayment(from, to, value);

        assertEq(higherToken.balanceOf(from), 0);
        assertEq(higherToken.balanceOf(to), value - (value / 20) * 2);
        assertEq(higherToken.balanceOf(_factory.higherCollective()), value / 20);
        assertEq(higherToken.balanceOf(_factory.feeRecipient()), value / 20);
    }

    function test_cannotTransferFeesAsUnauthorizedHigher1155(
        address unauthorizedHigher1155,
        address from,
        address to,
        uint256 value
    ) external {
        vm.expectRevert(
            abi.encodeWithSelector(IHigher1155Factory.UnauthorizedHigher1155.selector, unauthorizedHigher1155)
        );
        vm.prank(unauthorizedHigher1155);
        _factory.transferPayment(from, to, value);
    }

    function assertCloneCode(bytes calldata code, address implementation) public pure {
        assertEq(code[0:10], hex"363d3d373d3d3d363d73");
        assertEq(code[10:30], bytes(abi.encodePacked(implementation)));
        assertEq(code[30:], hex"5af43d82803e903d91602b57fd5bf3");
    }
}
