// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {Higher1155} from "src/Higher1155.sol";
import {Higher1155Factory} from "src/Higher1155Factory.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        Higher1155 implementation = new Higher1155();
        new Higher1155Factory(address(implementation));

        vm.stopBroadcast();
    }
}
