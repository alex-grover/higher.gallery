// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {Higher1155} from "src/Higher1155.sol";
import {Higher1155Factory} from "src/Higher1155Factory.sol";

// MockHigher on Base Sepolia
// address constant higherToken = 0x92F6e588F74bBbc07565dEC525C98599cfe02726;

address constant higherToken = 0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe;
address constant higherCollective = 0x8177b34687bC8B99C205e533ae7DD7c6C9D07a66;
address constant feeRecipient = 0xEf62D2dD8F856AaB964Bddf476d15F211eCF1323;

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        Higher1155 implementation = new Higher1155();
        new Higher1155Factory(address(implementation), higherToken, higherCollective, feeRecipient);

        vm.stopBroadcast();
    }
}
