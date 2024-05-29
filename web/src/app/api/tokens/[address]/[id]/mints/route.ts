import { NextResponse } from 'next/server'
import { Address } from 'viem'
import { NextRouteContext } from '@/lib/types/next'
import { BigIntString } from '@/lib/zod/bigint'
import { tokenSchema } from '../schema'

export const revalidate = 5

export type TokenMintsResponse = {
  minterAddress: Address
  amount: BigIntString
  comment?: string
}[]

export async function GET(_: Request, { params }: NextRouteContext) {
  const parseResult = tokenSchema.safeParse(params)
  if (!parseResult.success) return new Response(parseResult.error.message, { status: 400 })
  const { address, id } = parseResult.data

  // TODO: fetch data from Ponder

  return NextResponse.json<TokenMintsResponse>([])
}
