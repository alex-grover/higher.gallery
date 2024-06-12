import { NextResponse } from 'next/server'
import { createPublicClient, http } from 'viem'
import { mainnet } from 'wagmi/chains'
import { z } from 'zod'
import { env } from '@/env'
import { NextRouteContext } from '@/lib/types/next'
import { address } from '@/lib/zod/address'

export const revalidate = 86400 // One day in seconds

const client = createPublicClient({
  chain: mainnet,
  transport: http(env.MAINNET_RPC_URL),
})

const schema = z.object({
  address,
})

export type GetUserResponse = {
  ensName: string | null
}

export async function GET(_: Request, { params }: NextRouteContext) {
  const parseResult = schema.safeParse(params)
  if (!parseResult.success)
    return new Response(parseResult.error.message, { status: 400 })

  const ensName = await client.getEnsName({ address: parseResult.data.address })

  return NextResponse.json<GetUserResponse>({
    ensName,
  })
}
