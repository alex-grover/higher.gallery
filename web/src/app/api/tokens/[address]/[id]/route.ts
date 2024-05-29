import { NextResponse } from 'next/server'
import { Address } from 'viem'
import { z } from 'zod'
import { NextRouteContext } from '@/lib/types/next'
import { address as addressSchema } from '@/lib/zod/address'
import { BigIntString } from '@/lib/zod/bigint'

export const revalidate = 60 * 60 * 24

const schema = z.object({
  address: addressSchema,
  id: z.string().pipe(z.coerce.bigint().positive())
})

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
  const parseResult = schema.safeParse(params)
  if (!parseResult.success) return new Response(parseResult.error.message, { status: 400 })

  const { address, id } = parseResult.data

  // TODO: fetch data from Ponder

  return NextResponse.json<TokenDetailResponse>({})
}
