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

export type UserCollectionsListResponse = {
  id: Address
  name: string
  image: string
}[]

export async function GET(_: Request, { params }: NextRouteContext) {
  const parseResult = schema.safeParse(params)
  if (!parseResult.success)
    return new Response(parseResult.error.message, { status: 400 })

  const { higher1155Collections: collections } = await ponderClient.collections(
    parseResult.data,
  )

  return NextResponse.json<UserCollectionsListResponse>(
    collections.items.map((collection) => ({
      id: address.parse(collection.id),
      name: collection.name,
      image: collection.image,
    })),
  )
}
