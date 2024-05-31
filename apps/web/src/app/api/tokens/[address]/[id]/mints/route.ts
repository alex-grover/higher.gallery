import { NextResponse } from 'next/server'
import { type Address } from 'viem'
import { z } from 'zod'
import { type NextRouteContext } from '@/lib/types/next'
import { address as addressSchema } from '@/lib/zod/address'
import { type BigIntString } from '@/lib/zod/bigint'

export const revalidate = 5

const schema = z.object({
  address: addressSchema,
  id: z.string().pipe(z.coerce.bigint().positive()),
})

export type TokenMintsResponse = {
  minterAddress: Address
  amount: BigIntString
  comment?: string
}[]

export function GET(_: Request, { params }: NextRouteContext) {
  const parseResult = schema.safeParse(params)
  if (!parseResult.success)
    return new Response(parseResult.error.message, { status: 400 })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { address, id } = parseResult.data

  // TODO: fetch data from Ponder

  return NextResponse.json<TokenMintsResponse>([])
}
