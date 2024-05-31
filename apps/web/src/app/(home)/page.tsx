import { Tokens } from '@/app/(home)/tokens'
import { ponderClient } from '@/lib/ponder'
import { address } from '@/lib/zod/address'

export const revalidate = 10

export default async function HomePage() {
  const { higher1155Tokens } = await ponderClient.tokens()

  const tokens = higher1155Tokens.items.map((token) => ({
    collection: {
      id: address.parse(token.higher1155Collection.id),
      creatorAddress: address.parse(token.higher1155Collection.creatorAddress),
    },
    tokenId: token.tokenId,
    name: token.name,
  }))

  return (
    <main>
      <Tokens
        tokens={tokens}
        cursor={higher1155Tokens.pageInfo.endCursor ?? null}
      />
    </main>
  )
}
