// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Clones} from "openzeppelin-contracts/contracts/proxy/Clones.sol";
import {IHigher1155} from "src/IHigher1155.sol";
import {IHigher1155Factory} from "src/IHigher1155Factory.sol";
import {HigherMinter} from "src/HigherMinter.sol";

contract Higher1155Factory is IHigher1155Factory {
    mapping(address => bool) internal _higher1155s;
    address internal immutable _minter;
    address internal immutable _higher1155Implementation;

    constructor(address higher1155Implementation) {
        _minter = address(new HigherMinter(address(this)));
        _higher1155Implementation = higher1155Implementation;
    }

    function deploy(string calldata contractURI) external override returns (address) {
        address higher1155 = Clones.cloneDeterministic(_higher1155Implementation, keccak256(abi.encode(msg.sender)));
        IHigher1155(higher1155).initialize(msg.sender, _minter, contractURI);
        _higher1155s[higher1155] = true;
        emit Higher1155Deployed(msg.sender, address(higher1155));
        return higher1155;
    }

    function isHigher1155(address higher1155) external view override returns (bool) {
        return _higher1155s[higher1155];
    }

    function minter() external view override returns (address) {
        return _minter;
    }
}
