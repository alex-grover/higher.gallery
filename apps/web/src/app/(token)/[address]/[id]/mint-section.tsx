'use client'

import * as Form from '@radix-ui/react-form'
import { Box, Button, Flex, Text, TextField } from '@radix-ui/themes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { useAccount, usePublicClient } from 'wagmi'
import { chain } from '@/env'
import { TokenQuery } from '@/generated/ponder'
import {
  iHigher1155FactoryAddress,
  useReadErc20Allowance,
  useReadErc20BalanceOf,
  useWriteErc20Approve,
  useWriteHigher1155Mint,
} from '@/generated/wagmi'
import { UINT256_MAX } from '@/lib/constants'
import { useMints } from '@/lib/hooks/mints'
import { address as addressSchema } from '@/lib/zod/address'

// eslint-disable-next-line import/no-named-as-default-member
dayjs.extend(relativeTime)

type MintButtonProps = {
  token: NonNullable<TokenQuery['token']>
}

export function MintSection({ token }: MintButtonProps) {
  const client = usePublicClient()
  const account = useAccount()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const mintEndTime = useMemo(
    () => token.endTimestamp && new Date(Number(token.endTimestamp) * 1000),
    [token.endTimestamp],
  )
  const [mintEnded, setMintEnded] = useState(
    !!mintEndTime && mintEndTime < new Date(),
  )
  const [timeRemaining, setTimeRemaining] = useState(
    mintEndTime && !mintEnded && dayjs(mintEndTime).fromNow(true),
  )

  useEffect(() => {
    if (!mintEndTime) return

    const interval = setInterval(() => {
      setTimeRemaining(!mintEnded && dayjs(mintEndTime).fromNow(true))
      setMintEnded(mintEndTime < new Date())
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [mintEndTime, mintEnded])

  const mints = useMints(token)

  const { data: balance } = useReadErc20BalanceOf({
    args: [account.address ?? '0x'],
    query: {
      enabled: account.status === 'connected',
    },
  })
  const { data: allowance } = useReadErc20Allowance({
    args: [account.address ?? '0x', iHigher1155FactoryAddress[chain.id]],
    query: {
      enabled: account.status === 'connected',
    },
  })

  const { writeContractAsync: approve } = useWriteErc20Approve()

  const { writeContractAsync } = useWriteHigher1155Mint()

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      async function handle() {
        if (!client) {
          alert('Error getting client')
          return
        }

        if (allowance === undefined) {
          alert('Error getting token allowance')
          return
        }

        if (allowance < BigInt(token.price)) {
          const approveHash = await approve({
            args: [iHigher1155FactoryAddress[chain.id], UINT256_MAX],
          })

          const approveReceipt = await client.waitForTransactionReceipt({
            hash: approveHash,
            confirmations: 3,
          })

          if (approveReceipt.status === 'reverted') {
            alert('Approval transaction reverted')
            return
          }
        }

        const data = new FormData(event.currentTarget)
        const amount = data.get('amount')
        const comment = data.get('comment')

        if (typeof amount !== 'string' || typeof comment !== 'string') {
          alert('Invalid form data')
          return
        }

        const hash = await writeContractAsync({
          address: addressSchema.parse(token.collection.id),
          args: [BigInt(token.tokenId), BigInt(amount), comment],
        })

        const receipt = await client.waitForTransactionReceipt({
          hash,
          confirmations: 3,
        })
        setIsSubmitting(false)

        if (receipt.status === 'reverted') {
          alert('Transaction reverted')
          return
        }

        alert('Minted!')
      }

      void handle()
    },
    [client, allowance, approve, writeContractAsync, token],
  )

  return (
    <Flex direction="column" gap="3">
      <Flex asChild direction="column" gap="3">
        <Form.Root onSubmit={handleSubmit}>
          <Form.Field name="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control asChild>
              <TextField.Root
                type="number"
                inputMode="numeric"
                placeholder="Number of editions to mint"
                defaultValue="1"
                min="1"
                required
              />
            </Form.Control>
            <Form.Message asChild match="valueMissing">
              <Text as="div" size="2" mt="1" color="red">
                Please enter an amount
              </Text>
            </Form.Message>
            <Form.Message asChild match="rangeUnderflow">
              <Text as="div" size="2" mt="1" color="red">
                Invalid amount
              </Text>
            </Form.Message>
          </Form.Field>

          <Form.Field name="comment">
            <Form.Control asChild>
              <TextField.Root placeholder="Add a comment" />
            </Form.Control>
          </Form.Field>

          <Box asChild width="100%">
            <Form.Submit asChild>
              <Button
                size="3"
                loading={isSubmitting}
                disabled={
                  account.status !== 'connected' ||
                  balance === undefined ||
                  balance < BigInt(token.price) ||
                  (!!token.maxSupply &&
                    (!mints ||
                      BigInt(mints.count) >= BigInt(token.maxSupply))) ||
                  mintEnded
                }
              >
                Mint
              </Button>
            </Form.Submit>
          </Box>
        </Form.Root>
      </Flex>

      <Text align="center" color="gray" size="1">
        {(!!timeRemaining || mintEnded) && (
          <>
            {timeRemaining && <Text>{timeRemaining} remaining</Text>}
            {mintEnded && <Text>Mint ended</Text>}
            <Text> &bull; </Text>
          </>
        )}
        <Text>
          {mints?.count}
          {token.maxSupply && !mintEnded && ` / ${token.maxSupply}`} minted
        </Text>
      </Text>
    </Flex>
  )
}
