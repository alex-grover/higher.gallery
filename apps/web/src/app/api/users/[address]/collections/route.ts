import { NextResponse } from 'next/server'
import { Address } from 'viem'
import { z } from 'zod'
import { ponderClient } from '@/lib/ponder'
import { NextRouteContext } from '@/lib/types/next'
import { address } from '@/lib/zod/address'

export const revalidate = 5

const schema = z.object({
  address,
})

export type ListUserCollectionsResponse = {
  id: Address
  name: string
  image: string
  tokenCount: number
}[]

export async function GET(_: Request, { params }: NextRouteContext) {
  const parseResult = schema.safeParse(params)
  if (!parseResult.success)
    return new Response(parseResult.error.message, { status: 400 })

  const { collections } = await ponderClient.collections(parseResult.data)

  return NextResponse.json<ListUserCollectionsResponse>(
    collections.items.map((collection) => ({
      id: address.parse(collection.id),
      name: collection.name,
      image: collection.image,
      tokenCount: collection.tokenCount,
    })),
  )
}
