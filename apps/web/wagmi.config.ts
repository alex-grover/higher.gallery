import { defineConfig } from '@wagmi/cli'
import { foundry, react } from '@wagmi/cli/plugins'
import { base, baseSepolia } from 'wagmi/chains'

export default defineConfig({
  out: 'src/generated/wagmi.ts',
  plugins: [
    react(),
    foundry({
      project: '../../contracts',
      include: ['Higher*', 'ERC20*'],
      deployments: {
        ERC20: {
          [base.id]: '0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe',
          [baseSepolia.id]: '0x0000000000000000000000000000000000000000',
        },
        Higher1155Factory: {
          [base.id]: '0x0000000000000000000000000000000000000000',
          [baseSepolia.id]: '0x0000000000000000000000000000000000000000',
        },
        HigherMinter: {
          [base.id]: '0x0000000000000000000000000000000000000000',
          [baseSepolia.id]: '0x0000000000000000000000000000000000000000',
        },
      },
    }),
  ],
})
