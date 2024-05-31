'use client'

import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'
import { formatEther } from 'viem'
import { useAccount, usePublicClient } from 'wagmi'
import { ListTokenMintsResponse } from '@/app/api/tokens/[address]/[id]/mints/route'
import { chain } from '@/env'
import { TokenQuery } from '@/generated/ponder'
import {
  higherMinterAddress,
  useReadErc20Allowance,
  useReadErc20BalanceOf,
  useWriteErc20Approve,
  useWriteHigher1155Mint,
} from '@/generated/wagmi'
import { UINT256_MAX } from '@/lib/constants'
import { address as addressSchema } from '@/lib/zod/address'
import styles from './mint.module.css'

type MintProps = {
  token: NonNullable<TokenQuery['token']>
}

export function Mint({ token }: MintProps) {
  const client = usePublicClient()
  const account = useAccount()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const { data: balance } = useReadErc20BalanceOf({
    args: [account.address ?? '0x'],
    query: {
      enabled: account.status === 'connected',
    },
  })
  const { data: allowance } = useReadErc20Allowance({
    args: [account.address ?? '0x', higherMinterAddress[chain.id]],
    query: {
      enabled: account.status === 'connected',
    },
  })

  const { data } = useSWR<ListTokenMintsResponse>(
    `/api/tokens/${token.collection.id}/${token.tokenId}/mints`,
    { refreshInterval: 10000 },
  )

  const mintEndTime = useMemo(
    () => token.endTimestamp && new Date(Number(token.endTimestamp) * 1000),
    [token.endTimestamp],
  )
  const [mintEnded, setMintEnded] = useState(
    !!mintEndTime && mintEndTime >= new Date(),
  )

  useEffect(() => {
    if (!mintEndTime) return

    const interval = setInterval(() => {
      setMintEnded(mintEndTime >= new Date())
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [mintEndTime])

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
            args: [higherMinterAddress[chain.id], UINT256_MAX],
          })

          const approveReceipt = await client.waitForTransactionReceipt({
            hash: approveHash,
            confirmations: 5,
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
          confirmations: 5,
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
    <form onSubmit={handleSubmit}>
      <button
        className={styles.button}
        disabled={
          account.status !== 'connected' ||
          balance === undefined ||
          balance < BigInt(token.price) ||
          (!!token.maxSupply &&
            (!data || BigInt(data.count) >= BigInt(token.maxSupply))) ||
          mintEnded ||
          isSubmitting
        }
      >
        Mint for {formatEther(BigInt(token.price))} $↑
      </button>
    </form>
  )
}
