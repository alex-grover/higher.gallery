/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'
import { formatEther } from 'viem'
import { z } from 'zod'
import { chain } from '@/env'
import {
  erc20PermitAbi,
  erc20PermitAddress,
  higher1155Abi,
  iHigher1155FactoryAddress,
} from '@/generated/wagmi'
import { UINT256_MAX } from '@/lib/constants'
import { ponderClient } from '@/lib/ponder'
import { formatIpfsUri } from '@/lib/utils/ipfs'
import { address } from '@/lib/zod/address'

export const app = new Frog()

export const runtime = 'edge'

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
const chainId = `eip155:${chain.id}` as const

const schema = z.object({
  address,
  id: z.string().pipe(z.coerce.bigint().positive()),
})

app.frame('/:address/:id', async (c) => {
  const parseResult = schema.safeParse({
    address: c.req.param('address'),
    id: c.req.param('id'),
  })
  if (!parseResult.success)
    return new Response(parseResult.error.message, { status: 400 })
  const { address, id } = parseResult.data

  const { token } = await ponderClient.token({
    token: `${address}-${id.toString()}`,
  })
  if (!token) return new Response('Not found', { status: 404 })

  return c.res({
    title: token.name,
    image: formatIpfsUri(token.image, 1000),
    imageAspectRatio: '1:1',
    intents: [
      /* eslint-disable react/jsx-key */
      <TextInput placeholder="Add a comment..." />,
      <Button.Transaction
        target={`/${parseResult.data.address}/${parseResult.data.id.toString()}/approve`}
        action={`/${parseResult.data.address}/${parseResult.data.id.toString()}/approve/finish`}
      >
        Approve $HIGHER
      </Button.Transaction>,
      <Button.Transaction
        target={`/${parseResult.data.address}/${parseResult.data.id.toString()}/mint`}
        action={`/${parseResult.data.address}/${parseResult.data.id.toString()}/mint/finish`}
      >
        Mint for {formatEther(BigInt(token.price))} $HIGHER
      </Button.Transaction>,
    ],
  })
})

app.transaction('/:address/:id/approve', async (c) => {
  const parseResult = schema.safeParse({
    address: c.req.param('address'),
    id: c.req.param('id'),
  })
  if (!parseResult.success)
    return new Response(parseResult.error.message, { status: 400 })
  const { address, id } = parseResult.data

  const { token } = await ponderClient.token({
    token: `${address}-${id.toString()}`,
  })
  if (!token) return new Response('Not found', { status: 404 })

  return c.contract({
    abi: erc20PermitAbi,
    chainId,
    to: erc20PermitAddress[chain.id],
    functionName: 'approve',
    args: [iHigher1155FactoryAddress[chain.id], UINT256_MAX],
  })
})

app.frame('/approve/finish', async (c) => {})

app.transaction('/:address/:id/mint', async (c) => {
  const parseResult = schema.safeParse({
    address: c.req.param('address'),
    id: c.req.param('id'),
  })
  if (!parseResult.success)
    return new Response(parseResult.error.message, { status: 400 })
  const { address, id } = parseResult.data

  const { token } = await ponderClient.token({
    token: `${address}-${id.toString()}`,
  })
  if (!token) return new Response('Not found', { status: 404 })

  return c.contract({
    abi: higher1155Abi,
    chainId,
    to: address,
    functionName: 'mint',
    args: [id, 1n, c.inputText ?? ''],
  })
})

app.frame('/mint/finish', async (c) => {})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
