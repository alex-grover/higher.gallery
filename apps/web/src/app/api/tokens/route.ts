import { NextResponse } from 'next/server'
import { Address } from 'viem'
import { z } from 'zod'
import { ponderClient } from '@/lib/ponder'
import { address } from '@/lib/zod/address'

export const revalidate = 10

const schema = z.object({
  cursor: z.string().optional(),
})

export type TokenListResponse = {
  tokens: {
    collection: {
      creatorAddress: Address
    }
    name: string
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

  const { higher1155Tokens: tokens } = await ponderClient.tokens({ cursor })

  // TODO: return mint count, time/supply limits, order by currently minting first?
  return NextResponse.json<TokenListResponse>({
    tokens: tokens.items.map((token) => ({
      collection: {
        creatorAddress: address.parse(
          token.higher1155Collection.creatorAddress,
        ),
      },
      name: token.name,
    })),
    cursor: tokens.pageInfo.endCursor ?? null,
  })
}
