// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import {MintConfig} from "src/IHigher1155.sol";
import {Higher1155} from "src/Higher1155.sol";
import {Higher1155Factory} from "src/Higher1155Factory.sol";
import {MockERC1155TokenReceiver} from "test/MockERC1155TokenReceiver.sol";
import {MockHigherToken} from "test/MockHigherToken.sol";

address constant higherCollective = 0x8177b34687bC8B99C205e533ae7DD7c6C9D07a66;
address constant feeRecipient = 0xEf62D2dD8F856AaB964Bddf476d15F211eCF1323;

contract TestIntegration is Test {
    struct Params {
        address creator;
        string contractURI;
        string tokenURI;
        MintConfig mintConfig;
        uint256 amount;
        string comment;
    }

    function test_integration(Params memory params) external {
        params.mintConfig.price = bound(params.mintConfig.price, 0, 3.4028236692e38);
        params.amount = bound(params.amount, 0, 3.4028236692e38);
        params.mintConfig.maxSupply = bound(params.mintConfig.maxSupply, params.amount, type(uint256).max);
        vm.warp(params.mintConfig.endTimestamp);

        MockHigherToken higherToken = new MockHigherToken();
        (address minter, uint256 minterPk) = makeAddrAndKey("minter");
        setUpTokenReceiver(minter);

        Higher1155 implementation = new Higher1155();
        Higher1155Factory factory =
            new Higher1155Factory(address(implementation), address(higherToken), higherCollective, feeRecipient);

        vm.prank(params.creator);
        address collection = factory.deploy(params.contractURI, params.tokenURI, params.mintConfig);

        uint256 cost = params.amount * params.mintConfig.price;
        bytes32 hash = keccak256(
            abi.encodePacked(
                hex"1901",
                higherToken.DOMAIN_SEPARATOR(),
                keccak256(
                    abi.encode(
                        keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)"),
                        minter,
                        address(factory),
                        cost,
                        higherToken.nonces(minter),
                        block.timestamp
                    )
                )
            )
        );
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(minterPk, hash);

        higherToken.mint(minter, cost);
        vm.prank(minter);
        Higher1155(collection).approveAndMint(
            minter, address(factory), cost, block.timestamp, v, r, s, 1, params.amount, params.comment
        );

        assertEq(Higher1155(collection).balanceOf(minter, 1), params.amount);
    }

    function setUpTokenReceiver(address tokenReceiver) internal {
        vm.assume(
            tokenReceiver > address(9) && tokenReceiver != 0x7109709ECfa91a80626fF3989D68f67F5b1DD12D
                && tokenReceiver != CONSOLE
        );

        vm.etch(tokenReceiver, type(MockERC1155TokenReceiver).runtimeCode);
    }
}
