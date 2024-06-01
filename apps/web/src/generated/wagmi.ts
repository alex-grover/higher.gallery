import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x92F6e588F74bBbc07565dEC525C98599cfe02726)
 */
export const erc20Abi = [
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
] as const

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x92F6e588F74bBbc07565dEC525C98599cfe02726)
 */
export const erc20Address = {
  8453: '0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe',
  84532: '0x92F6e588F74bBbc07565dEC525C98599cfe02726',
} as const

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x92F6e588F74bBbc07565dEC525C98599cfe02726)
 */
export const erc20Config = { address: erc20Address, abi: erc20Abi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Higher1155
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const higher1155Abi = [
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owners', internalType: 'address[]', type: 'address[]' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'balanceOfBatch',
    outputs: [
      { name: 'balances', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'contractURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenURI', internalType: 'string', type: 'string' },
      {
        name: 'newMintConfig',
        internalType: 'struct IHigher1155.MintConfig',
        type: 'tuple',
        components: [
          { name: 'price', internalType: 'uint256', type: 'uint256' },
          { name: 'maxSupply', internalType: 'uint256', type: 'uint256' },
          { name: 'endTimestamp', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'create',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'newMinter', internalType: 'address', type: 'address' },
      { name: 'newContractURI', internalType: 'string', type: 'string' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'comment', internalType: 'string', type: 'string' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'mintConfig',
    outputs: [
      {
        name: '',
        internalType: 'struct IHigher1155.MintConfig',
        type: 'tuple',
        components: [
          { name: 'price', internalType: 'uint256', type: 'uint256' },
          { name: 'maxSupply', internalType: 'uint256', type: 'uint256' },
          { name: 'endTimestamp', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'minter',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeBatchTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'uri',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'Create',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
      {
        name: 'minter',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'comment',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'Mint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'ids',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
      {
        name: 'amounts',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'TransferBatch',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TransferSingle',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'value', internalType: 'string', type: 'string', indexed: false },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'URI',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Withdraw',
  },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'MintEnded' },
  { type: 'error', inputs: [], name: 'MintLimitReached' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Higher1155Factory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x05DfF58D334aF8B9a47B65184Bd878658af2b05c)
 */
export const higher1155FactoryAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: 'higher1155Implementation',
        internalType: 'address',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'contractURI', internalType: 'string', type: 'string' }],
    name: 'deploy',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'higher1155', internalType: 'address', type: 'address' }],
    name: 'isHigher1155',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'minter',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'creator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'higher1155',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Higher1155Deployed',
  },
  { type: 'error', inputs: [], name: 'ERC1167FailedCreateClone' },
] as const

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x05DfF58D334aF8B9a47B65184Bd878658af2b05c)
 */
export const higher1155FactoryAddress = {
  8453: '0x0000000000000000000000000000000000000000',
  84532: '0x05DfF58D334aF8B9a47B65184Bd878658af2b05c',
} as const

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x05DfF58D334aF8B9a47B65184Bd878658af2b05c)
 */
export const higher1155FactoryConfig = {
  address: higher1155FactoryAddress,
  abi: higher1155FactoryAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// HigherMinter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3c129065b7768a24a838c3e8400e118453f30dcb)
 */
export const higherMinterAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'higher1155Factory', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'cost', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3c129065b7768a24a838c3e8400e118453f30dcb)
 */
export const higherMinterAddress = {
  8453: '0x0000000000000000000000000000000000000000',
  84532: '0x3C129065B7768a24a838C3E8400E118453F30dCB',
} as const

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3c129065b7768a24a838c3e8400e118453f30dcb)
 */
export const higherMinterConfig = {
  address: higherMinterAddress,
  abi: higherMinterAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x92F6e588F74bBbc07565dEC525C98599cfe02726)
 */
export const useReadErc20 = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  address: erc20Address,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x92F6e588F74bBbc07565dEC525C98599cfe02726)
 */
export const useReadErc20DomainSeparator = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: 'DOMAIN_SEPARATOR',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"allowance"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x92F6e588F74bBbc07565dEC525C98599cfe02726)
 */
export const useReadErc20Allowance = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x92F6e588F74bBbc07565dEC525C98599cfe02726)
 */
export const useReadErc20BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"decimals"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x92F6e588F74bBbc07565dEC525C98599cfe02726)
 */
export const useReadErc20Decimals = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"name"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x92F6e588F74bBbc07565dEC525C98599cfe02726)
 */
export const useReadErc20Name = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"nonces"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x92F6e588F74bBbc07565dEC525C98599cfe02726)
 */
export const useReadErc20Nonces = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: 'nonces',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"symbol"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x92F6e588F74bBbc07565dEC525C98599cfe02726)
 */
export const useReadErc20Symbol = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"totalSupply"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x92F6e588F74bBbc07565dEC525C98599cfe02726)
 */
export const useReadErc20TotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x92F6e588F74bBbc07565dEC525C98599cfe02726)
 */
export const useWriteErc20 = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  address: erc20Address,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x92F6e588F74bBbc07565dEC525C98599cfe02726)
 */
export const useWriteErc20Approve = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"permit"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x92F6e588F74bBbc07565dEC525C98599cfe02726)
 */
export const useWriteErc20Permit = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: 'permit',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x92F6e588F74bBbc07565dEC525C98599cfe02726)
 */
export const useWriteErc20Transfer = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x92F6e588F74bBbc07565dEC525C98599cfe02726)
 */
export const useWriteErc20TransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x92F6e588F74bBbc07565dEC525C98599cfe02726)
 */
export const useSimulateErc20 = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
  address: erc20Address,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x92F6e588F74bBbc07565dEC525C98599cfe02726)
 */
export const useSimulateErc20Approve = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"permit"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x92F6e588F74bBbc07565dEC525C98599cfe02726)
 */
export const useSimulateErc20Permit = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: 'permit',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x92F6e588F74bBbc07565dEC525C98599cfe02726)
 */
export const useSimulateErc20Transfer = /*#__PURE__*/ createUseSimulateContract(
  { abi: erc20Abi, address: erc20Address, functionName: 'transfer' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x92F6e588F74bBbc07565dEC525C98599cfe02726)
 */
export const useSimulateErc20TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc20Abi,
    address: erc20Address,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x92F6e588F74bBbc07565dEC525C98599cfe02726)
 */
export const useWatchErc20Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc20Abi,
  address: erc20Address,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Approval"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x92F6e588F74bBbc07565dEC525C98599cfe02726)
 */
export const useWatchErc20ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    address: erc20Address,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Transfer"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x92F6e588F74bBbc07565dEC525C98599cfe02726)
 */
export const useWatchErc20TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    address: erc20Address,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link higher1155Abi}__
 */
export const useReadHigher1155 = /*#__PURE__*/ createUseReadContract({
  abi: higher1155Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link higher1155Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadHigher1155BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: higher1155Abi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link higher1155Abi}__ and `functionName` set to `"balanceOfBatch"`
 */
export const useReadHigher1155BalanceOfBatch =
  /*#__PURE__*/ createUseReadContract({
    abi: higher1155Abi,
    functionName: 'balanceOfBatch',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link higher1155Abi}__ and `functionName` set to `"contractURI"`
 */
export const useReadHigher1155ContractUri = /*#__PURE__*/ createUseReadContract(
  { abi: higher1155Abi, functionName: 'contractURI' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link higher1155Abi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const useReadHigher1155IsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: higher1155Abi,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link higher1155Abi}__ and `functionName` set to `"mintConfig"`
 */
export const useReadHigher1155MintConfig = /*#__PURE__*/ createUseReadContract({
  abi: higher1155Abi,
  functionName: 'mintConfig',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link higher1155Abi}__ and `functionName` set to `"minter"`
 */
export const useReadHigher1155Minter = /*#__PURE__*/ createUseReadContract({
  abi: higher1155Abi,
  functionName: 'minter',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link higher1155Abi}__ and `functionName` set to `"owner"`
 */
export const useReadHigher1155Owner = /*#__PURE__*/ createUseReadContract({
  abi: higher1155Abi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link higher1155Abi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadHigher1155SupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: higher1155Abi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link higher1155Abi}__ and `functionName` set to `"uri"`
 */
export const useReadHigher1155Uri = /*#__PURE__*/ createUseReadContract({
  abi: higher1155Abi,
  functionName: 'uri',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link higher1155Abi}__
 */
export const useWriteHigher1155 = /*#__PURE__*/ createUseWriteContract({
  abi: higher1155Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link higher1155Abi}__ and `functionName` set to `"create"`
 */
export const useWriteHigher1155Create = /*#__PURE__*/ createUseWriteContract({
  abi: higher1155Abi,
  functionName: 'create',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link higher1155Abi}__ and `functionName` set to `"initialize"`
 */
export const useWriteHigher1155Initialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: higher1155Abi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link higher1155Abi}__ and `functionName` set to `"mint"`
 */
export const useWriteHigher1155Mint = /*#__PURE__*/ createUseWriteContract({
  abi: higher1155Abi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link higher1155Abi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteHigher1155RenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: higher1155Abi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link higher1155Abi}__ and `functionName` set to `"safeBatchTransferFrom"`
 */
export const useWriteHigher1155SafeBatchTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: higher1155Abi,
    functionName: 'safeBatchTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link higher1155Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useWriteHigher1155SafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: higher1155Abi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link higher1155Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useWriteHigher1155SetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: higher1155Abi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link higher1155Abi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteHigher1155TransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: higher1155Abi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link higher1155Abi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteHigher1155Withdraw = /*#__PURE__*/ createUseWriteContract({
  abi: higher1155Abi,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link higher1155Abi}__
 */
export const useSimulateHigher1155 = /*#__PURE__*/ createUseSimulateContract({
  abi: higher1155Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link higher1155Abi}__ and `functionName` set to `"create"`
 */
export const useSimulateHigher1155Create =
  /*#__PURE__*/ createUseSimulateContract({
    abi: higher1155Abi,
    functionName: 'create',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link higher1155Abi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateHigher1155Initialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: higher1155Abi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link higher1155Abi}__ and `functionName` set to `"mint"`
 */
export const useSimulateHigher1155Mint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: higher1155Abi,
    functionName: 'mint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link higher1155Abi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateHigher1155RenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: higher1155Abi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link higher1155Abi}__ and `functionName` set to `"safeBatchTransferFrom"`
 */
export const useSimulateHigher1155SafeBatchTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: higher1155Abi,
    functionName: 'safeBatchTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link higher1155Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useSimulateHigher1155SafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: higher1155Abi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link higher1155Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useSimulateHigher1155SetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: higher1155Abi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link higher1155Abi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateHigher1155TransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: higher1155Abi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link higher1155Abi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulateHigher1155Withdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: higher1155Abi,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link higher1155Abi}__
 */
export const useWatchHigher1155Event =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: higher1155Abi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link higher1155Abi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const useWatchHigher1155ApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: higher1155Abi,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link higher1155Abi}__ and `eventName` set to `"Create"`
 */
export const useWatchHigher1155CreateEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: higher1155Abi,
    eventName: 'Create',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link higher1155Abi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchHigher1155InitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: higher1155Abi,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link higher1155Abi}__ and `eventName` set to `"Mint"`
 */
export const useWatchHigher1155MintEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: higher1155Abi,
    eventName: 'Mint',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link higher1155Abi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchHigher1155OwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: higher1155Abi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link higher1155Abi}__ and `eventName` set to `"TransferBatch"`
 */
export const useWatchHigher1155TransferBatchEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: higher1155Abi,
    eventName: 'TransferBatch',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link higher1155Abi}__ and `eventName` set to `"TransferSingle"`
 */
export const useWatchHigher1155TransferSingleEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: higher1155Abi,
    eventName: 'TransferSingle',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link higher1155Abi}__ and `eventName` set to `"URI"`
 */
export const useWatchHigher1155UriEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: higher1155Abi,
    eventName: 'URI',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link higher1155Abi}__ and `eventName` set to `"Withdraw"`
 */
export const useWatchHigher1155WithdrawEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: higher1155Abi,
    eventName: 'Withdraw',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link higher1155FactoryAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x05DfF58D334aF8B9a47B65184Bd878658af2b05c)
 */
export const useReadHigher1155Factory = /*#__PURE__*/ createUseReadContract({
  abi: higher1155FactoryAbi,
  address: higher1155FactoryAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link higher1155FactoryAbi}__ and `functionName` set to `"isHigher1155"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x05DfF58D334aF8B9a47B65184Bd878658af2b05c)
 */
export const useReadHigher1155FactoryIsHigher1155 =
  /*#__PURE__*/ createUseReadContract({
    abi: higher1155FactoryAbi,
    address: higher1155FactoryAddress,
    functionName: 'isHigher1155',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link higher1155FactoryAbi}__ and `functionName` set to `"minter"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x05DfF58D334aF8B9a47B65184Bd878658af2b05c)
 */
export const useReadHigher1155FactoryMinter =
  /*#__PURE__*/ createUseReadContract({
    abi: higher1155FactoryAbi,
    address: higher1155FactoryAddress,
    functionName: 'minter',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link higher1155FactoryAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x05DfF58D334aF8B9a47B65184Bd878658af2b05c)
 */
export const useWriteHigher1155Factory = /*#__PURE__*/ createUseWriteContract({
  abi: higher1155FactoryAbi,
  address: higher1155FactoryAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link higher1155FactoryAbi}__ and `functionName` set to `"deploy"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x05DfF58D334aF8B9a47B65184Bd878658af2b05c)
 */
export const useWriteHigher1155FactoryDeploy =
  /*#__PURE__*/ createUseWriteContract({
    abi: higher1155FactoryAbi,
    address: higher1155FactoryAddress,
    functionName: 'deploy',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link higher1155FactoryAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x05DfF58D334aF8B9a47B65184Bd878658af2b05c)
 */
export const useSimulateHigher1155Factory =
  /*#__PURE__*/ createUseSimulateContract({
    abi: higher1155FactoryAbi,
    address: higher1155FactoryAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link higher1155FactoryAbi}__ and `functionName` set to `"deploy"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x05DfF58D334aF8B9a47B65184Bd878658af2b05c)
 */
export const useSimulateHigher1155FactoryDeploy =
  /*#__PURE__*/ createUseSimulateContract({
    abi: higher1155FactoryAbi,
    address: higher1155FactoryAddress,
    functionName: 'deploy',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link higher1155FactoryAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x05DfF58D334aF8B9a47B65184Bd878658af2b05c)
 */
export const useWatchHigher1155FactoryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: higher1155FactoryAbi,
    address: higher1155FactoryAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link higher1155FactoryAbi}__ and `eventName` set to `"Higher1155Deployed"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x05DfF58D334aF8B9a47B65184Bd878658af2b05c)
 */
export const useWatchHigher1155FactoryHigher1155DeployedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: higher1155FactoryAbi,
    address: higher1155FactoryAddress,
    eventName: 'Higher1155Deployed',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link higherMinterAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3c129065b7768a24a838c3e8400e118453f30dcb)
 */
export const useWriteHigherMinter = /*#__PURE__*/ createUseWriteContract({
  abi: higherMinterAbi,
  address: higherMinterAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link higherMinterAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3c129065b7768a24a838c3e8400e118453f30dcb)
 */
export const useWriteHigherMinterMint = /*#__PURE__*/ createUseWriteContract({
  abi: higherMinterAbi,
  address: higherMinterAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link higherMinterAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3c129065b7768a24a838c3e8400e118453f30dcb)
 */
export const useSimulateHigherMinter = /*#__PURE__*/ createUseSimulateContract({
  abi: higherMinterAbi,
  address: higherMinterAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link higherMinterAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3c129065b7768a24a838c3e8400e118453f30dcb)
 */
export const useSimulateHigherMinterMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: higherMinterAbi,
    address: higherMinterAddress,
    functionName: 'mint',
  })
