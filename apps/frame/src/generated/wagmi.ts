import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC20Permit
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2499426138486d85b7E145E0057C42ED74AF1512)
 */
export const erc20PermitAbi = [
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
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
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
    name: 'eip712Domain',
    outputs: [
      { name: 'fields', internalType: 'bytes1', type: 'bytes1' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'version', internalType: 'string', type: 'string' },
      { name: 'chainId', internalType: 'uint256', type: 'uint256' },
      { name: 'verifyingContract', internalType: 'address', type: 'address' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'extensions', internalType: 'uint256[]', type: 'uint256[]' },
    ],
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
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
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
      { name: 'value', internalType: 'uint256', type: 'uint256' },
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
      { name: 'value', internalType: 'uint256', type: 'uint256' },
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
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  { type: 'event', anonymous: false, inputs: [], name: 'EIP712DomainChanged' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  { type: 'error', inputs: [], name: 'ECDSAInvalidSignature' },
  {
    type: 'error',
    inputs: [{ name: 'length', internalType: 'uint256', type: 'uint256' }],
    name: 'ECDSAInvalidSignatureLength',
  },
  {
    type: 'error',
    inputs: [{ name: 's', internalType: 'bytes32', type: 'bytes32' }],
    name: 'ECDSAInvalidSignatureS',
  },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
  {
    type: 'error',
    inputs: [{ name: 'deadline', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC2612ExpiredSignature',
  },
  {
    type: 'error',
    inputs: [
      { name: 'signer', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC2612InvalidSigner',
  },
  {
    type: 'error',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'currentNonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InvalidAccountNonce',
  },
  { type: 'error', inputs: [], name: 'InvalidShortString' },
  {
    type: 'error',
    inputs: [{ name: 'str', internalType: 'string', type: 'string' }],
    name: 'StringTooLong',
  },
] as const

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2499426138486d85b7E145E0057C42ED74AF1512)
 */
export const erc20PermitAddress = {
  8453: '0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe',
  84532: '0x2499426138486d85b7E145E0057C42ED74AF1512',
} as const

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2499426138486d85b7E145E0057C42ED74AF1512)
 */
export const erc20PermitConfig = {
  address: erc20PermitAddress,
  abi: erc20PermitAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Higher1155
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const higher1155Abi = [
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
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'comment', internalType: 'string', type: 'string' },
    ],
    name: 'approveAndMint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
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
      { name: 'uri_', internalType: 'string', type: 'string' },
      {
        name: 'mintConfig_',
        internalType: 'struct MintConfig',
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
    inputs: [],
    name: 'factory',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'contractURI_', internalType: 'string', type: 'string' },
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
        internalType: 'struct MintConfig',
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
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  {
    type: 'error',
    inputs: [
      { name: 'mintCount', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'maxSupply', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'MaxSupplyExceeded',
  },
  {
    type: 'error',
    inputs: [
      { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
      { name: 'endTimestamp', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'MintEnded',
  },
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
  {
    type: 'error',
    inputs: [{ name: 'msgSender', internalType: 'address', type: 'address' }],
    name: 'UnauthorizedCreator',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IHigher1155Factory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000084df404a033b74ee686bc0080357ed9b)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xd29ec6d67258f5aa8d59b738890a546dcead5104)
 */
export const iHigher1155FactoryAbi = [
  {
    type: 'function',
    inputs: [
      { name: 'contractURI', internalType: 'string', type: 'string' },
      { name: 'tokenURI', internalType: 'string', type: 'string' },
      {
        name: 'config',
        internalType: 'struct MintConfig',
        type: 'tuple',
        components: [
          { name: 'price', internalType: 'uint256', type: 'uint256' },
          { name: 'maxSupply', internalType: 'uint256', type: 'uint256' },
          { name: 'endTimestamp', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'deploy',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'higherToken',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferPayment',
    outputs: [],
    stateMutability: 'nonpayable',
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
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'proceeds',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'PaymentTransferred',
  },
  {
    type: 'error',
    inputs: [{ name: 'msgSender', internalType: 'address', type: 'address' }],
    name: 'UnauthorizedHigher1155',
  },
] as const

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000084df404a033b74ee686bc0080357ed9b)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xd29ec6d67258f5aa8d59b738890a546dcead5104)
 */
export const iHigher1155FactoryAddress = {
  8453: '0x0000000084DF404A033B74EE686bc0080357ED9B',
  84532: '0xd29Ec6d67258F5aA8d59b738890A546DceaD5104',
} as const

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000084df404a033b74ee686bc0080357ed9b)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xd29ec6d67258f5aa8d59b738890a546dcead5104)
 */
export const iHigher1155FactoryConfig = {
  address: iHigher1155FactoryAddress,
  abi: iHigher1155FactoryAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20PermitAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2499426138486d85b7E145E0057C42ED74AF1512)
 */
export const useReadErc20Permit = /*#__PURE__*/ createUseReadContract({
  abi: erc20PermitAbi,
  address: erc20PermitAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20PermitAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2499426138486d85b7E145E0057C42ED74AF1512)
 */
export const useReadErc20PermitDomainSeparator =
  /*#__PURE__*/ createUseReadContract({
    abi: erc20PermitAbi,
    address: erc20PermitAddress,
    functionName: 'DOMAIN_SEPARATOR',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20PermitAbi}__ and `functionName` set to `"allowance"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2499426138486d85b7E145E0057C42ED74AF1512)
 */
export const useReadErc20PermitAllowance = /*#__PURE__*/ createUseReadContract({
  abi: erc20PermitAbi,
  address: erc20PermitAddress,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20PermitAbi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2499426138486d85b7E145E0057C42ED74AF1512)
 */
export const useReadErc20PermitBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: erc20PermitAbi,
  address: erc20PermitAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20PermitAbi}__ and `functionName` set to `"decimals"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2499426138486d85b7E145E0057C42ED74AF1512)
 */
export const useReadErc20PermitDecimals = /*#__PURE__*/ createUseReadContract({
  abi: erc20PermitAbi,
  address: erc20PermitAddress,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20PermitAbi}__ and `functionName` set to `"eip712Domain"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2499426138486d85b7E145E0057C42ED74AF1512)
 */
export const useReadErc20PermitEip712Domain =
  /*#__PURE__*/ createUseReadContract({
    abi: erc20PermitAbi,
    address: erc20PermitAddress,
    functionName: 'eip712Domain',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20PermitAbi}__ and `functionName` set to `"name"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2499426138486d85b7E145E0057C42ED74AF1512)
 */
export const useReadErc20PermitName = /*#__PURE__*/ createUseReadContract({
  abi: erc20PermitAbi,
  address: erc20PermitAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20PermitAbi}__ and `functionName` set to `"nonces"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2499426138486d85b7E145E0057C42ED74AF1512)
 */
export const useReadErc20PermitNonces = /*#__PURE__*/ createUseReadContract({
  abi: erc20PermitAbi,
  address: erc20PermitAddress,
  functionName: 'nonces',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20PermitAbi}__ and `functionName` set to `"symbol"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2499426138486d85b7E145E0057C42ED74AF1512)
 */
export const useReadErc20PermitSymbol = /*#__PURE__*/ createUseReadContract({
  abi: erc20PermitAbi,
  address: erc20PermitAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20PermitAbi}__ and `functionName` set to `"totalSupply"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2499426138486d85b7E145E0057C42ED74AF1512)
 */
export const useReadErc20PermitTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: erc20PermitAbi,
    address: erc20PermitAddress,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20PermitAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2499426138486d85b7E145E0057C42ED74AF1512)
 */
export const useWriteErc20Permit = /*#__PURE__*/ createUseWriteContract({
  abi: erc20PermitAbi,
  address: erc20PermitAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20PermitAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2499426138486d85b7E145E0057C42ED74AF1512)
 */
export const useWriteErc20PermitApprove = /*#__PURE__*/ createUseWriteContract({
  abi: erc20PermitAbi,
  address: erc20PermitAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20PermitAbi}__ and `functionName` set to `"permit"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2499426138486d85b7E145E0057C42ED74AF1512)
 */
export const useWriteErc20PermitPermit = /*#__PURE__*/ createUseWriteContract({
  abi: erc20PermitAbi,
  address: erc20PermitAddress,
  functionName: 'permit',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20PermitAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2499426138486d85b7E145E0057C42ED74AF1512)
 */
export const useWriteErc20PermitTransfer = /*#__PURE__*/ createUseWriteContract(
  {
    abi: erc20PermitAbi,
    address: erc20PermitAddress,
    functionName: 'transfer',
  },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20PermitAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2499426138486d85b7E145E0057C42ED74AF1512)
 */
export const useWriteErc20PermitTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc20PermitAbi,
    address: erc20PermitAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20PermitAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2499426138486d85b7E145E0057C42ED74AF1512)
 */
export const useSimulateErc20Permit = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20PermitAbi,
  address: erc20PermitAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20PermitAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2499426138486d85b7E145E0057C42ED74AF1512)
 */
export const useSimulateErc20PermitApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc20PermitAbi,
    address: erc20PermitAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20PermitAbi}__ and `functionName` set to `"permit"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2499426138486d85b7E145E0057C42ED74AF1512)
 */
export const useSimulateErc20PermitPermit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc20PermitAbi,
    address: erc20PermitAddress,
    functionName: 'permit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20PermitAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2499426138486d85b7E145E0057C42ED74AF1512)
 */
export const useSimulateErc20PermitTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc20PermitAbi,
    address: erc20PermitAddress,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20PermitAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2499426138486d85b7E145E0057C42ED74AF1512)
 */
export const useSimulateErc20PermitTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc20PermitAbi,
    address: erc20PermitAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20PermitAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2499426138486d85b7E145E0057C42ED74AF1512)
 */
export const useWatchErc20PermitEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20PermitAbi,
    address: erc20PermitAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20PermitAbi}__ and `eventName` set to `"Approval"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2499426138486d85b7E145E0057C42ED74AF1512)
 */
export const useWatchErc20PermitApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20PermitAbi,
    address: erc20PermitAddress,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20PermitAbi}__ and `eventName` set to `"EIP712DomainChanged"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2499426138486d85b7E145E0057C42ED74AF1512)
 */
export const useWatchErc20PermitEip712DomainChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20PermitAbi,
    address: erc20PermitAddress,
    eventName: 'EIP712DomainChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20PermitAbi}__ and `eventName` set to `"Transfer"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2499426138486d85b7E145E0057C42ED74AF1512)
 */
export const useWatchErc20PermitTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20PermitAbi,
    address: erc20PermitAddress,
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link higher1155Abi}__ and `functionName` set to `"factory"`
 */
export const useReadHigher1155Factory = /*#__PURE__*/ createUseReadContract({
  abi: higher1155Abi,
  functionName: 'factory',
})

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
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link higher1155Abi}__ and `functionName` set to `"approveAndMint"`
 */
export const useWriteHigher1155ApproveAndMint =
  /*#__PURE__*/ createUseWriteContract({
    abi: higher1155Abi,
    functionName: 'approveAndMint',
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
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link higher1155Abi}__
 */
export const useSimulateHigher1155 = /*#__PURE__*/ createUseSimulateContract({
  abi: higher1155Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link higher1155Abi}__ and `functionName` set to `"approveAndMint"`
 */
export const useSimulateHigher1155ApproveAndMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: higher1155Abi,
    functionName: 'approveAndMint',
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iHigher1155FactoryAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000084df404a033b74ee686bc0080357ed9b)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xd29ec6d67258f5aa8d59b738890a546dcead5104)
 */
export const useReadIHigher1155Factory = /*#__PURE__*/ createUseReadContract({
  abi: iHigher1155FactoryAbi,
  address: iHigher1155FactoryAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iHigher1155FactoryAbi}__ and `functionName` set to `"higherToken"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000084df404a033b74ee686bc0080357ed9b)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xd29ec6d67258f5aa8d59b738890a546dcead5104)
 */
export const useReadIHigher1155FactoryHigherToken =
  /*#__PURE__*/ createUseReadContract({
    abi: iHigher1155FactoryAbi,
    address: iHigher1155FactoryAddress,
    functionName: 'higherToken',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iHigher1155FactoryAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000084df404a033b74ee686bc0080357ed9b)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xd29ec6d67258f5aa8d59b738890a546dcead5104)
 */
export const useWriteIHigher1155Factory = /*#__PURE__*/ createUseWriteContract({
  abi: iHigher1155FactoryAbi,
  address: iHigher1155FactoryAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iHigher1155FactoryAbi}__ and `functionName` set to `"deploy"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000084df404a033b74ee686bc0080357ed9b)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xd29ec6d67258f5aa8d59b738890a546dcead5104)
 */
export const useWriteIHigher1155FactoryDeploy =
  /*#__PURE__*/ createUseWriteContract({
    abi: iHigher1155FactoryAbi,
    address: iHigher1155FactoryAddress,
    functionName: 'deploy',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iHigher1155FactoryAbi}__ and `functionName` set to `"transferPayment"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000084df404a033b74ee686bc0080357ed9b)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xd29ec6d67258f5aa8d59b738890a546dcead5104)
 */
export const useWriteIHigher1155FactoryTransferPayment =
  /*#__PURE__*/ createUseWriteContract({
    abi: iHigher1155FactoryAbi,
    address: iHigher1155FactoryAddress,
    functionName: 'transferPayment',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iHigher1155FactoryAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000084df404a033b74ee686bc0080357ed9b)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xd29ec6d67258f5aa8d59b738890a546dcead5104)
 */
export const useSimulateIHigher1155Factory =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iHigher1155FactoryAbi,
    address: iHigher1155FactoryAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iHigher1155FactoryAbi}__ and `functionName` set to `"deploy"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000084df404a033b74ee686bc0080357ed9b)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xd29ec6d67258f5aa8d59b738890a546dcead5104)
 */
export const useSimulateIHigher1155FactoryDeploy =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iHigher1155FactoryAbi,
    address: iHigher1155FactoryAddress,
    functionName: 'deploy',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iHigher1155FactoryAbi}__ and `functionName` set to `"transferPayment"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000084df404a033b74ee686bc0080357ed9b)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xd29ec6d67258f5aa8d59b738890a546dcead5104)
 */
export const useSimulateIHigher1155FactoryTransferPayment =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iHigher1155FactoryAbi,
    address: iHigher1155FactoryAddress,
    functionName: 'transferPayment',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iHigher1155FactoryAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000084df404a033b74ee686bc0080357ed9b)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xd29ec6d67258f5aa8d59b738890a546dcead5104)
 */
export const useWatchIHigher1155FactoryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: iHigher1155FactoryAbi,
    address: iHigher1155FactoryAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iHigher1155FactoryAbi}__ and `eventName` set to `"Higher1155Deployed"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000084df404a033b74ee686bc0080357ed9b)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xd29ec6d67258f5aa8d59b738890a546dcead5104)
 */
export const useWatchIHigher1155FactoryHigher1155DeployedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: iHigher1155FactoryAbi,
    address: iHigher1155FactoryAddress,
    eventName: 'Higher1155Deployed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iHigher1155FactoryAbi}__ and `eventName` set to `"PaymentTransferred"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000084df404a033b74ee686bc0080357ed9b)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xd29ec6d67258f5aa8d59b738890a546dcead5104)
 */
export const useWatchIHigher1155FactoryPaymentTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: iHigher1155FactoryAbi,
    address: iHigher1155FactoryAddress,
    eventName: 'PaymentTransferred',
  })
