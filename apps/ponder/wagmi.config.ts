import { defineConfig } from '@wagmi/cli'
import { foundry } from '@wagmi/cli/plugins'
import { base, baseSepolia } from 'viem/chains'

export default defineConfig({
  out: 'src/generated/wagmi.ts',
  plugins: [
    foundry({
      project: '../../contracts',
      include: ['Higher1155.sol/*', 'IHigher1155Factory.sol/*', 'ERC20.sol/*'],
      deployments: {
        ERC20: {
          [base.id]: '0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe',
          [baseSepolia.id]: '0x92F6e588F74bBbc07565dEC525C98599cfe02726',
        },
        IHigher1155Factory: {
          [base.id]: '0x0000000000000000000000000000000000000000',
          [baseSepolia.id]: '0x0000000000000000000000000000000000000000',
        },
      },
    }),
  ],
})
