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
          [base.id]: '0x0000000084df404a033b74ee686bc0080357ed9b',
          [baseSepolia.id]: '0x3d0e846799f8f52b35248f809eef38a5801147bd',
        },
      },
      forge: {
        build: false,
      },
    }),
  ],
})
