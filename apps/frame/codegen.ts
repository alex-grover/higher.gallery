import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: '../ponder/generated/schema.graphql',
  documents: 'src/**/*.gql',
  generates: {
    'src/generated/ponder.ts': {
      plugins: [
        {
          add: {
            content: "import { BigIntString } from '@/lib/zod/bigint';",
          },
        },
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
      ],
    },
  },
  config: {
    strictScalars: true,
    scalars: {
      BigInt: {
        input: 'BigInt',
        output: 'BigIntString',
      },
    },
  },
}

export default config
