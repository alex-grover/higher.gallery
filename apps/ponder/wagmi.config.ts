import { defineConfig } from '@wagmi/cli'
import { foundry } from '@wagmi/cli/plugins'
import { base, baseSepolia } from 'viem/chains'

export default defineConfig({
  out: 'src/generated/wagmi.ts',
  plugins: [
    foundry({
      project: '../../contracts',
      include: ['Higher1155.sol/*', 'IHigher1155Factory.sol/*'],
      deployments: {
        IHigher1155Factory: {
          [base.id]: '0x0000000000000000000000000000000000000000',
          [baseSepolia.id]: '0x06bbbd0b2eef2e838261f3da0d7959fadb7d9481',
        },
      },
    }),
  ],
})
