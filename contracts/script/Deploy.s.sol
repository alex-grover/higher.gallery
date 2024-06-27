// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {Higher1155} from "src/Higher1155.sol";
import {Higher1155Factory} from "src/Higher1155Factory.sol";

// MockHigherToken on Base Sepolia
// address constant higherToken = 0x2499426138486d85b7E145E0057C42ED74AF1512;

address constant higherToken = 0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe;
address constant higherCollective = 0x8177b34687bC8B99C205e533ae7DD7c6C9D07a66;
address constant owner = 0x00000000C2Ea98e101c8D7BC1cAc1b0E1309f325;

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        Higher1155 implementation = new Higher1155{salt: vm.envBytes32("HIGHER_1155_SALT")}();
        new Higher1155Factory{salt: vm.envBytes32("HIGHER_1155_FACTORY_SALT")}(
            address(implementation), higherToken, higherCollective, owner
        );

        vm.stopBroadcast();
    }
}
