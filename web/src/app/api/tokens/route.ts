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

export function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const cursor = searchParams.get('cursor')

  // TODO: fetch data from Ponder

  return NextResponse.json<TokenListResponse>({
    tokens: [],
    cursor: null,
  })
}
