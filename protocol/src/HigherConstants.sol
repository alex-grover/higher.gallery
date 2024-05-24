// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {IERC20} from "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";

library HigherConstants {
    IERC20 internal constant HigherToken = IERC20(0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe);
    address internal constant FeeRecipient = address(0); // TODO
}
