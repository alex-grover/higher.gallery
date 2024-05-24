// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import {IHigher1155Factory} from "src/IHigher1155Factory.sol";
import {HigherConstants} from "src/HigherConstants.sol";
import {HigherMinter} from "src/HigherMinter.sol";
import {MockHigher} from "test/MockHigher.sol";

contract HigherMinterTest is Test {
    function test_mint(address higher1155Factory, address higher1155, address account, uint256 cost) external {
        vm.assume(higher1155Factory > address(9));

        MockHigher mockHigher = new MockHigher();
        vm.etch(address(HigherConstants.HigherToken), address(mockHigher).code);
        MockHigher(address(HigherConstants.HigherToken)).mint(account, cost);
        vm.etch(higher1155Factory, address(mockHigher).code);
        vm.mockCall(
            higher1155Factory,
            abi.encodeWithSelector(IHigher1155Factory.isHigher1155.selector, higher1155),
            abi.encode(true)
        );

        HigherMinter minter = new HigherMinter(higher1155Factory);
        vm.prank(account);
        HigherConstants.HigherToken.approve(address(minter), cost);

        vm.prank(higher1155);
        minter.mint(account, cost);
    }

    function test_cannotMintAsNonHigher1155(
        address higher1155Factory,
        address higher1155,
        address account,
        uint256 cost
    ) external {
        vm.assume(higher1155Factory > address(9));

        MockHigher mockHigher = new MockHigher();
        vm.etch(address(HigherConstants.HigherToken), address(mockHigher).code);
        vm.etch(higher1155Factory, address(mockHigher).code);
        vm.mockCall(
            higher1155Factory,
            abi.encodeWithSelector(IHigher1155Factory.isHigher1155.selector, higher1155),
            abi.encode(false)
        );

        HigherMinter minter = new HigherMinter(higher1155Factory);

        vm.expectRevert();
        vm.prank(higher1155);
        minter.mint(account, cost);
    }
}
