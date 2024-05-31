import { NextResponse } from 'next/server'
import { Address } from 'viem'
import { z } from 'zod'
import { ponderClient } from '@/lib/ponder'
import { address } from '@/lib/zod/address'
import { BigIntString } from '@/lib/zod/bigint'

export const revalidate = 10

const schema = z.object({
  cursor: z.string().optional(),
})

export type ListTokensResponse = {
  tokens: {
    collection: {
      id: Address
      creatorAddress: Address
    }
    tokenId: BigIntString
    name: string
    image: string
  }[]
  cursor: string | null
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const parseResult = schema.safeParse(
    Object.fromEntries(searchParams.entries()),
  )
  if (!parseResult.success)
    return new Response(parseResult.error.message, { status: 400 })
  const { cursor } = parseResult.data

  const { tokens } = await ponderClient.tokens({ cursor })

  return NextResponse.json<ListTokensResponse>({
    tokens: tokens.items.map((token) => ({
      collection: {
        id: address.parse(token.collection.id),
        creatorAddress: address.parse(token.collection.creatorAddress),
      },
      tokenId: token.tokenId,
      name: token.name,
      image: token.image,
    })),
    cursor: tokens.pageInfo.endCursor ?? null,
  })
}
