'use client'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { formatEther } from 'viem'
import { useAccount, usePublicClient } from 'wagmi'
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
import { useMints } from '@/lib/hooks/mints'
import { address as addressSchema } from '@/lib/zod/address'
import styles from './mint-section.module.css'

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
  }, [mintEndTime])

  const mints = useMints(token)

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
    },
    [client, allowance, approve, writeContractAsync, token],
  )

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <button
          className={styles.button}
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
        </button>
      </form>
      <div className={styles.info}>
        {(!!timeRemaining || mintEnded) && (
          <>
            {timeRemaining && <span>{timeRemaining} remaining</span>}
            {mintEnded && <span>Mint ended</span>}
            <span> &bull; </span>
          </>
        )}
        <span>
          {mints?.count}
          {token.maxSupply && !mintEnded && ` / ${token.maxSupply}`} minted
        </span>
      </div>
    </div>
  )
}
