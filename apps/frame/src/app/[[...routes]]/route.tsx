/** @jsxImportSource frog/jsx */

import { Button, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'
import { formatEther } from 'viem'
import { z } from 'zod'
import { app } from '@/app/app'
import { chain } from '@/env'
import {
  erc20PermitAbi,
  erc20PermitAddress,
  higher1155Abi,
  iHigher1155FactoryAddress,
} from '@/generated/wagmi'
import { UINT256_MAX } from '@/lib/constants'
import { formatIpfsUri } from '@/lib/ipfs'
import { ponderClient } from '@/lib/ponder'
import { Box, Heading, Text, VStack } from '@/lib/ui'
import { address } from '@/lib/zod/address'

export const runtime = 'edge'

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
const chainId = `eip155:${chain.id}` as const

const schema = z.object({
  address,
  id: z.string().pipe(z.coerce.bigint().positive()),
})

app.frame('/token/:address/:id', async (c) => {
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
    intents: [
      /* eslint-disable react/jsx-key */
      <TextInput placeholder="Add a comment..." />,
      <Button.Transaction
        target="/approve"
        action={`/token/${address}/${id.toString()}/approve/finish`}
      >
        Approve $HIGHER
      </Button.Transaction>,
      <Button.Transaction
        target={`/token/${address}/${id.toString()}/mint`}
        action="/mint/finish"
      >
        Mint for {formatEther(BigInt(token.price))} $HIGHER
      </Button.Transaction>,
    ],
  })
})

app.transaction('/approve', (c) => {
  return c.contract({
    abi: erc20PermitAbi,
    chainId,
    to: erc20PermitAddress[chain.id],
    functionName: 'approve',
    args: [iHigher1155FactoryAddress[chain.id], UINT256_MAX],
  })
})

app.frame('/token/:address/:id/approve/finish', (c) => {
  const parseResult = schema.safeParse({
    address: c.req.param('address'),
    id: c.req.param('id'),
  })
  if (!parseResult.success)
    return new Response(parseResult.error.message, { status: 400 })
  const { address, id } = parseResult.data

  return c.res({
    image: (
      <Box
        grow
        alignHorizontal="center"
        alignVertical="center"
        backgroundColor="background"
        padding="32"
      >
        <VStack gap="4">
          <Heading align="center">Sent approval transaction!</Heading>
          <Text color="text200" size="20" align="center">
            Transaction hash: {c.transactionId}
          </Text>
        </VStack>
      </Box>
    ),
    intents: [
      <Button.Transaction
        target={`/${address}/${id.toString()}/mint`}
        action="/mint/finish"
      >
        Mint
      </Button.Transaction>,
    ],
  })
})

app.transaction('/token/:address/:id/mint', (c) => {
  const parseResult = schema.safeParse({
    address: c.req.param('address'),
    id: c.req.param('id'),
  })
  if (!parseResult.success)
    return new Response(parseResult.error.message, { status: 400 })
  const { address, id } = parseResult.data

  return c.contract({
    abi: higher1155Abi,
    chainId,
    to: address,
    functionName: 'mint',
    args: [id, 1n, c.inputText ?? ''],
  })
})

app.frame('/mint/finish', (c) => {
  return c.res({
    image: (
      <Box
        grow
        alignHorizontal="center"
        alignVertical="center"
        backgroundColor="background"
        padding="32"
      >
        <VStack gap="4">
          <Heading align="center">Sent mint transaction!</Heading>
          <Text color="text200" size="20" align="center">
            Transaction hash: {c.transactionId}
          </Text>
        </VStack>
      </Box>
    ),
  })
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
