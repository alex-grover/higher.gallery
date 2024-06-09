// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ERC20} from "solmate/tokens/ERC20.sol";

contract MockHigherToken is ERC20 {
    constructor() ERC20("MockHigher", "MH", 18) {}

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}
