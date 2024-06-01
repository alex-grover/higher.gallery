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
          [baseSepolia.id]: '0x92F6e588F74bBbc07565dEC525C98599cfe02726',
        },
        Higher1155Factory: {
          [base.id]: '0x0000000000000000000000000000000000000000',
          [baseSepolia.id]: '0x05DfF58D334aF8B9a47B65184Bd878658af2b05c',
        },
        HigherMinter: {
          [base.id]: '0x0000000000000000000000000000000000000000',
          [baseSepolia.id]: '0x3c129065b7768a24a838c3e8400e118453f30dcb',
        },
      },
    }),
  ],
})
