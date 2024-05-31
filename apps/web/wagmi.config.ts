import { defineConfig } from '@wagmi/cli'
import { foundry, react } from '@wagmi/cli/plugins'
import { base } from 'wagmi/chains'

export default defineConfig({
  out: 'src/generated/wagmi.ts',
  plugins: [
    react(),
    foundry({
      project: '../../contracts',
      include: ['IHigher1155*'],
      deployments: {
        IHigher1155Factory: {
          [base.id]: '0x0000000000000000000000000000000000000000',
        },
        IHigherMinter: {
          [base.id]: '0x0000000000000000000000000000000000000000',
        },
      },
    }),
  ],
})
