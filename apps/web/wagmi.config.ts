import { defineConfig } from '@wagmi/cli'
import { foundry, react } from '@wagmi/cli/plugins'
import { base, baseSepolia } from 'wagmi/chains'

export default defineConfig({
  out: 'src/generated/wagmi.ts',
  plugins: [
    react(),
    foundry({
      project: '../../contracts',
      include: [
        'Higher1155.sol/*',
        'IHigher1155Factory.sol/*',
        'ERC20Permit.sol/*',
      ],
      deployments: {
        ERC20Permit: {
          [base.id]: '0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe',
          [baseSepolia.id]: '0x2499426138486d85b7E145E0057C42ED74AF1512',
        },
        IHigher1155Factory: {
          [base.id]: '0x00000000F3652DA8F114B3BCd60B86C8D8e1127E',
          [baseSepolia.id]: '0x3d0e846799f8f52b35248f809eef38a5801147bd',
        },
      },
      forge: {
        build: false,
      },
    }),
  ],
})
