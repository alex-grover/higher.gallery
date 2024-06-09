// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Clones} from "openzeppelin-contracts/contracts/proxy/Clones.sol";
import {IERC20} from "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import {IHigher1155, MintConfig} from "src/IHigher1155.sol";
import {IHigher1155Factory} from "src/IHigher1155Factory.sol";

contract Higher1155Factory is IHigher1155Factory {
    mapping(address higher1155Address => bool isHigher1155) internal _higher1155s;
    address public immutable higher1155Implementation;
    address public immutable higherToken;
    address public immutable higherCollective;
    address public immutable feeRecipient;

    constructor(
        address higher1155Implementation_,
        address higherToken_,
        address higherCollective_,
        address feeRecipient_
    ) {
        higher1155Implementation = higher1155Implementation_;
        higherToken = higherToken_;
        higherCollective = higherCollective_;
        feeRecipient = feeRecipient_;
    }

    function deploy(string calldata contractURI, string calldata tokenURI, MintConfig calldata mintConfig)
        external
        override
        returns (address)
    {
        address higher1155 =
            Clones.cloneDeterministic(higher1155Implementation, keccak256(abi.encodePacked(msg.sender, contractURI)));
        IHigher1155(higher1155).initialize(msg.sender, contractURI);
        _higher1155s[higher1155] = true;

        emit Higher1155Deployed(msg.sender, address(higher1155));

        IHigher1155(higher1155).create(tokenURI, mintConfig);

        return higher1155;
    }

    function transferPayment(address from, address to, uint256 value) external override {
        if (!_higher1155s[msg.sender]) {
            revert UnauthorizedHigher1155(msg.sender);
        }

        uint256 feePart = value / 20;
        uint256 proceeds = value - (feePart * 2);

        IERC20(higherToken).transferFrom(from, to, proceeds);
        IERC20(higherToken).transferFrom(from, higherCollective, feePart);
        IERC20(higherToken).transferFrom(from, feeRecipient, feePart);

        emit PaymentTransferred(to, proceeds);
    }
}
