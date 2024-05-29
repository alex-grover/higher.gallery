import { NextResponse } from 'next/server'
import { Address } from 'viem'

export const revalidate = 10

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
  const cursor = searchParams.get('cursor')

  // TODO: fetch data from Ponder

  return NextResponse.json<TokenListResponse>({
    tokens: [],
    cursor: null,
  })
}
