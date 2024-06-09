'use client'

import { Box, Button, Flex, Text } from '@radix-ui/themes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { formatEther } from 'viem'
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

  const handleClick = useCallback(() => {
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

      const hash = await writeContractAsync({
        address: addressSchema.parse(token.collection.id),
        args: [BigInt(token.tokenId), 1n, ''],
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
  }, [client, allowance, approve, writeContractAsync, token])

  return (
    <Flex direction="column" gap="3">
      <Box asChild width="100%">
        <Button
          size="3"
          onClick={handleClick}
          disabled={
            account.status !== 'connected' ||
            balance === undefined ||
            balance < BigInt(token.price) ||
            (!!token.maxSupply &&
              (!mints || BigInt(mints.count) >= BigInt(token.maxSupply))) ||
            mintEnded ||
            isSubmitting
          }
        >
          Mint for {formatEther(BigInt(token.price))} $HIGHER
        </Button>
      </Box>
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
