// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Clones} from "openzeppelin-contracts/contracts/proxy/Clones.sol";
import {IHigher1155} from "src/IHigher1155.sol";

contract Higher1155Factory {
    event Higher1155Deployed(address indexed creator, address higher1155);

    address internal _higher1155Implementation;

    constructor(address higher1155Implementation) {
        _higher1155Implementation = higher1155Implementation;
    }

    function deploy(string calldata contractURI) external returns (address) {
        address higher1155 = Clones.cloneDeterministic(_higher1155Implementation, keccak256(abi.encode(msg.sender)));
        IHigher1155(higher1155).initialize(msg.sender, contractURI);
        emit Higher1155Deployed(msg.sender, address(higher1155));
        return higher1155;
    }
}
