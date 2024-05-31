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

export type GetCollectionResponse = {
  id: Address
  creatorAddress: Address
  name: string
  image: string
}

export async function GET(_: Request, { params }: NextRouteContext) {
  const parseResult = schema.safeParse(params)
  if (!parseResult.success)
    return new Response(parseResult.error.message, { status: 400 })

  const { collection } = await ponderClient.collection({
    id: parseResult.data.address,
  })

  if (!collection) return new Response('Not found', { status: 404 })

  return NextResponse.json<GetCollectionResponse>({
    id: parseResult.data.address,
    creatorAddress: address.parse(collection.creatorAddress),
    name: collection.name,
    image: collection.image,
  })
}
