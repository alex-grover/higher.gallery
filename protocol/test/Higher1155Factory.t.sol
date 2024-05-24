// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import {Clones} from "openzeppelin-contracts/contracts/proxy/Clones.sol";
import {OwnableUpgradeable} from "openzeppelin-contracts-upgradeable/contracts/access/OwnableUpgradeable.sol";
import {Higher1155} from "src/Higher1155.sol";
import {Higher1155Factory} from "src/Higher1155Factory.sol";

contract Higher1155FactoryTest is Test {
    event Higher1155Deployed(address indexed creator, address higher1155);

    function test_deploy(address creator_, string calldata uri_) external {
        vm.assume(creator_ != address(0));

        Higher1155 higher1155Implementation = new Higher1155();
        Higher1155Factory factory = new Higher1155Factory(address(higher1155Implementation));

        address expectedAddress = Clones.predictDeterministicAddress(
            address(higher1155Implementation), keccak256(abi.encode(creator_)), address(factory)
        );
        vm.expectEmit(address(factory));
        emit Higher1155Deployed(creator_, expectedAddress);

        vm.prank(creator_);
        address higher1155 = factory.deploy(uri_);

        this.assertCloneCode(higher1155.code, address(higher1155Implementation));
        assertEq(OwnableUpgradeable(higher1155).owner(), creator_);
        assertEq(Higher1155(higher1155).contractURI(), uri_);
    }

    function assertCloneCode(bytes calldata code_, address implementation_) public pure {
        assertEq(code_[0:10], hex"363d3d373d3d3d363d73");
        assertEq(code_[10:30], bytes(abi.encodePacked(implementation_)));
        assertEq(code_[30:], hex"5af43d82803e903d91602b57fd5bf3");
    }
}
