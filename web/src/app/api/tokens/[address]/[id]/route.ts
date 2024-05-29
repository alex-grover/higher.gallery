import { NextResponse } from 'next/server'
import { Address } from 'viem'
import { NextRouteContext } from '@/lib/types/next'
import { BigIntString } from '@/lib/zod/bigint'
import { tokenSchema } from './schema'

export const revalidate = 60 * 60 * 24

export type TokenDetailResponse = {
  collection: {
    creatorAddress: Address
    name: string
    description: string
    image: string
  }
  name: string
  description: string
  image: string
  price: BigIntString,
  maxSupply: BigIntString,
  endTimestamp: BigIntString,
}

export async function GET(_: Request, { params }: NextRouteContext) {
  const parseResult = tokenSchema.safeParse(params)
  if (!parseResult.success) return new Response(parseResult.error.message, { status: 400 })
  const { address, id } = parseResult.data

  // TODO: fetch data from Ponder

  return NextResponse.json<TokenDetailResponse>({})
}
