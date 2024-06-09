// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {MintConfig} from "src/IHigher1155.sol";

interface IHigher1155Factory {
    event Higher1155Deployed(address indexed creator, address higher1155);
    event PaymentTransferred(address indexed to, uint256 proceeds);

    error UnauthorizedHigher1155(address msgSender);

    function deploy(string calldata contractURI, string calldata tokenURI, MintConfig calldata config)
        external
        returns (address);

    function transferPayment(address from, address to, uint256 value) external;
}
