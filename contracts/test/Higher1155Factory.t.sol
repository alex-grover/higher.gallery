// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import {Clones} from "openzeppelin-contracts/contracts/proxy/Clones.sol";
import {OwnableUpgradeable} from "openzeppelin-contracts-upgradeable/contracts/access/OwnableUpgradeable.sol";
import {Higher1155} from "src/Higher1155.sol";
import {Higher1155Factory} from "src/Higher1155Factory.sol";
import {HigherMinter} from "src/HigherMinter.sol";

contract Higher1155FactoryTest is Test {
    event Higher1155Deployed(address indexed creator, address higher1155);

    function test_deploy(address creator, string calldata contractURI) external {
        vm.assume(creator != address(0));

        Higher1155 higher1155Implementation = new Higher1155();
        Higher1155Factory factory = new Higher1155Factory(address(higher1155Implementation));

        vm.expectEmit(true, true, true, false, address(factory));
        emit Higher1155Deployed(creator, address(0));

        vm.prank(creator);
        address higher1155 = factory.deploy(contractURI);

        this.assertCloneCode(higher1155.code, address(higher1155Implementation));
        assert(factory.isHigher1155(higher1155));
        assertEq(OwnableUpgradeable(higher1155).owner(), creator);
        assertEq(Higher1155(higher1155).contractURI(), contractURI);
        assertNotEq(Higher1155(higher1155).minter(), address(0));
    }

    function assertCloneCode(bytes calldata code, address implementation) public pure {
        assertEq(code[0:10], hex"363d3d373d3d3d363d73");
        assertEq(code[10:30], bytes(abi.encodePacked(implementation)));
        assertEq(code[30:], hex"5af43d82803e903d91602b57fd5bf3");
    }
}
