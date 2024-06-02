// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {IERC20} from "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import {IHigher1155} from "src/IHigher1155.sol";
import {IHigher1155Factory} from "src/IHigher1155Factory.sol";
import {IHigherMinter} from "src/IHigherMinter.sol";
import {HigherConstants} from "src/HigherConstants.sol";

contract HigherMinter is IHigherMinter {
    address internal immutable _higher1155Factory;

    modifier onlyHigher1155() {
        require(IHigher1155Factory(_higher1155Factory).isHigher1155(msg.sender));

        _;
    }

    constructor(address higher1155Factory) {
        _higher1155Factory = higher1155Factory;
    }

    function mint(address account, address creator, uint256 cost) external override onlyHigher1155 {
        uint256 fee = cost / 10;
        uint256 earnings = cost - fee;
        HigherConstants.HigherToken.transferFrom(account, creator, earnings);
        HigherConstants.HigherToken.transferFrom(account, HigherConstants.FeeRecipient, fee);
        emit Mint(creator, earnings);
    }
}
