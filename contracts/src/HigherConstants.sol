// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {IERC20} from "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";

library HigherConstants {
    // Sepolia mock token address
    // IERC20 internal constant HigherToken = IERC20(0x92F6e588F74bBbc07565dEC525C98599cfe02726);
    IERC20 internal constant HigherToken = IERC20(0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe);
    address internal constant FeeRecipient = 0xEf62D2dD8F856AaB964Bddf476d15F211eCF1323;
}
