import { createConfig } from '@ponder/core'
import { getAbiItem, http } from 'viem'
import { base, baseSepolia } from 'viem/chains'
import { Higher1155Abi } from './abis/Higher1155Abi'
import { IHigher1155FactoryAbi } from './abis/IHigher1155FactoryAbi'
import { env } from './src/lib/env'

const chain = env.ENV === 'production' ? base : baseSepolia

const address = {
  [base.id]: '0x0000000000000000000000000000000000000000' as const,
  [baseSepolia.id]: '0x0000000000000000000000000000000000000000' as const,
}[chain.id]

const startBlock = {
  [base.id]: 15172306,
  [baseSepolia.id]: 10682853,
}[chain.id]

export default createConfig({
  networks: {
    base: {
      chainId: chain.id,
      transport: http(env.RPC_URL),
    },
  },
  contracts: {
    IHigher1155Factory: {
      network: 'base',
      abi: IHigher1155FactoryAbi,
      address,
      startBlock,
    },
    Higher1155: {
      network: 'base',
      abi: Higher1155Abi,
      factory: {
        address,
        event: getAbiItem({
          abi: IHigher1155FactoryAbi,
          name: 'Higher1155Deployed',
        }),
        parameter: 'higher1155',
      },
      startBlock,
    },
  },
})
