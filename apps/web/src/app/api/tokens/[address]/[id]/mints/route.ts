import { NextResponse } from 'next/server'
import { type Address } from 'viem'
import { z } from 'zod'
import { ponderClient } from '@/lib/ponder'
import { type NextRouteContext } from '@/lib/types/next'
import { address as addressSchema } from '@/lib/zod/address'
import { type BigIntString } from '@/lib/zod/bigint'

export const revalidate = 5

const schema = z.object({
  address: addressSchema,
  id: z.string().pipe(z.coerce.bigint().positive()),
  cursor: z.string().optional(),
})

export type ListTokenMintsResponse = {
  count: BigIntString
  mints: {
    id: string
    minterAddress: Address
    timestamp: BigIntString
    amount: BigIntString
    comment?: string
  }[]
  cursor: string | null
}

export async function GET(request: Request, { params }: NextRouteContext) {
  const { searchParams } = new URL(request.url)
  const parseResult = schema.safeParse({
    ...params,
    ...Object.fromEntries(searchParams.entries()),
  })
  if (!parseResult.success)
    return new Response(parseResult.error.message, { status: 400 })
  const { address, id, cursor } = parseResult.data

  const { token, mints } = await ponderClient.mints({
    token: `${address}-${id.toString()}`,
    cursor,
  })

  if (!token) return new Response('Not found', { status: 404 })

  return NextResponse.json<ListTokenMintsResponse>({
    count: token.mintCount,
    mints: mints.items.map((mint) => ({
      id: mint.id,
      minterAddress: addressSchema.parse(mint.minterAddress),
      timestamp: mint.timestamp,
      amount: mint.amount,
      comment: mint.comment ?? undefined,
    })),
    cursor: mints.pageInfo.endCursor ?? null,
  })
}
