import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IHigher1155
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iHigher1155Abi = [
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
        name: 'config',
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
      { name: 'minter', internalType: 'address', type: 'address' },
      { name: 'contractURI', internalType: 'string', type: 'string' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
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
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
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
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Withdraw',
  },
  { type: 'error', inputs: [], name: 'MintEnded' },
  { type: 'error', inputs: [], name: 'MintLimitReached' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IHigher1155Factory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 */
export const iHigher1155FactoryAbi = [
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
] as const

/**
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 */
export const iHigher1155FactoryAddress = {
  8453: '0x0000000000000000000000000000000000000000',
} as const

/**
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 */
export const iHigher1155FactoryConfig = {
  address: iHigher1155FactoryAddress,
  abi: iHigher1155FactoryAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iHigher1155Abi}__
 */
export const useReadIHigher1155 = /*#__PURE__*/ createUseReadContract({
  abi: iHigher1155Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iHigher1155Abi}__ and `functionName` set to `"contractURI"`
 */
export const useReadIHigher1155ContractUri =
  /*#__PURE__*/ createUseReadContract({
    abi: iHigher1155Abi,
    functionName: 'contractURI',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iHigher1155Abi}__ and `functionName` set to `"mintConfig"`
 */
export const useReadIHigher1155MintConfig = /*#__PURE__*/ createUseReadContract(
  { abi: iHigher1155Abi, functionName: 'mintConfig' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iHigher1155Abi}__ and `functionName` set to `"minter"`
 */
export const useReadIHigher1155Minter = /*#__PURE__*/ createUseReadContract({
  abi: iHigher1155Abi,
  functionName: 'minter',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iHigher1155Abi}__
 */
export const useWriteIHigher1155 = /*#__PURE__*/ createUseWriteContract({
  abi: iHigher1155Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iHigher1155Abi}__ and `functionName` set to `"create"`
 */
export const useWriteIHigher1155Create = /*#__PURE__*/ createUseWriteContract({
  abi: iHigher1155Abi,
  functionName: 'create',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iHigher1155Abi}__ and `functionName` set to `"initialize"`
 */
export const useWriteIHigher1155Initialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: iHigher1155Abi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iHigher1155Abi}__ and `functionName` set to `"mint"`
 */
export const useWriteIHigher1155Mint = /*#__PURE__*/ createUseWriteContract({
  abi: iHigher1155Abi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iHigher1155Abi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteIHigher1155Withdraw = /*#__PURE__*/ createUseWriteContract(
  { abi: iHigher1155Abi, functionName: 'withdraw' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iHigher1155Abi}__
 */
export const useSimulateIHigher1155 = /*#__PURE__*/ createUseSimulateContract({
  abi: iHigher1155Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iHigher1155Abi}__ and `functionName` set to `"create"`
 */
export const useSimulateIHigher1155Create =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iHigher1155Abi,
    functionName: 'create',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iHigher1155Abi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateIHigher1155Initialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iHigher1155Abi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iHigher1155Abi}__ and `functionName` set to `"mint"`
 */
export const useSimulateIHigher1155Mint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iHigher1155Abi,
    functionName: 'mint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iHigher1155Abi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulateIHigher1155Withdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iHigher1155Abi,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iHigher1155Abi}__
 */
export const useWatchIHigher1155Event =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: iHigher1155Abi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iHigher1155Abi}__ and `eventName` set to `"Create"`
 */
export const useWatchIHigher1155CreateEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: iHigher1155Abi,
    eventName: 'Create',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iHigher1155Abi}__ and `eventName` set to `"Mint"`
 */
export const useWatchIHigher1155MintEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: iHigher1155Abi,
    eventName: 'Mint',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iHigher1155Abi}__ and `eventName` set to `"Withdraw"`
 */
export const useWatchIHigher1155WithdrawEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: iHigher1155Abi,
    eventName: 'Withdraw',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iHigher1155FactoryAbi}__
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 */
export const useReadIHigher1155Factory = /*#__PURE__*/ createUseReadContract({
  abi: iHigher1155FactoryAbi,
  address: iHigher1155FactoryAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iHigher1155FactoryAbi}__ and `functionName` set to `"isHigher1155"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 */
export const useReadIHigher1155FactoryIsHigher1155 =
  /*#__PURE__*/ createUseReadContract({
    abi: iHigher1155FactoryAbi,
    address: iHigher1155FactoryAddress,
    functionName: 'isHigher1155',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iHigher1155FactoryAbi}__ and `functionName` set to `"minter"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 */
export const useReadIHigher1155FactoryMinter =
  /*#__PURE__*/ createUseReadContract({
    abi: iHigher1155FactoryAbi,
    address: iHigher1155FactoryAddress,
    functionName: 'minter',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iHigher1155FactoryAbi}__
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 */
export const useWriteIHigher1155Factory = /*#__PURE__*/ createUseWriteContract({
  abi: iHigher1155FactoryAbi,
  address: iHigher1155FactoryAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iHigher1155FactoryAbi}__ and `functionName` set to `"deploy"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 */
export const useWriteIHigher1155FactoryDeploy =
  /*#__PURE__*/ createUseWriteContract({
    abi: iHigher1155FactoryAbi,
    address: iHigher1155FactoryAddress,
    functionName: 'deploy',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iHigher1155FactoryAbi}__
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 */
export const useSimulateIHigher1155Factory =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iHigher1155FactoryAbi,
    address: iHigher1155FactoryAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iHigher1155FactoryAbi}__ and `functionName` set to `"deploy"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 */
export const useSimulateIHigher1155FactoryDeploy =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iHigher1155FactoryAbi,
    address: iHigher1155FactoryAddress,
    functionName: 'deploy',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iHigher1155FactoryAbi}__
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 */
export const useWatchIHigher1155FactoryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: iHigher1155FactoryAbi,
    address: iHigher1155FactoryAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iHigher1155FactoryAbi}__ and `eventName` set to `"Higher1155Deployed"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 */
export const useWatchIHigher1155FactoryHigher1155DeployedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: iHigher1155FactoryAbi,
    address: iHigher1155FactoryAddress,
    eventName: 'Higher1155Deployed',
  })
