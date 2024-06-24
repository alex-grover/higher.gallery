import { createConfig } from '@ponder/core'
import { getAbiItem, http } from 'viem'
import { base, baseSepolia } from 'viem/chains'
import {
  higher1155Abi,
  iHigher1155FactoryAbi,
  iHigher1155FactoryAddress,
} from '@/generated/wagmi'
import { env } from '@/lib/env'

const chain = env.ENV === 'production' ? base : baseSepolia

const startBlock = {
  [base.id]: 15172306,
  [baseSepolia.id]: 10682853,
}[chain.id]

export default createConfig({
  networks: {
    base: {
      chainId: chain.id,
      transport: http(env.RPC_URL),
      pollingInterval: 2000,
    },
  },
  contracts: {
    IHigher1155Factory: {
      network: 'base',
      abi: iHigher1155FactoryAbi,
      address: iHigher1155FactoryAddress[chain.id],
      startBlock,
    },
    Higher1155: {
      network: 'base',
      abi: higher1155Abi,
      factory: {
        address: iHigher1155FactoryAddress[chain.id],
        event: getAbiItem({
          abi: iHigher1155FactoryAbi,
          name: 'Higher1155Deployed',
        }),
        parameter: 'higher1155',
      },
      startBlock,
    },
  },
})
