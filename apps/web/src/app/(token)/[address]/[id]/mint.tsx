'use client'

import { FormEvent, useCallback, useState } from 'react'
import { formatEther } from 'viem'
import { usePublicClient } from 'wagmi'
import { TokenQuery } from '@/generated/ponder'
import { useWriteIHigher1155Mint } from '@/generated/wagmi'
import { address } from '@/lib/zod/address'
import styles from './mint.module.css'

type MintProps = {
  token: NonNullable<TokenQuery['token']>
}

export function Mint({ token }: MintProps) {
  const client = usePublicClient()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const { writeContractAsync } = useWriteIHigher1155Mint()

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      async function handle() {
        if (!client) {
          alert('Error getting client')
          return
        }

        const hash = await writeContractAsync({
          address: address.parse(token.collection.id),
          args: [BigInt(token.tokenId), 1n, ''],
        })

        const receipt = await client.waitForTransactionReceipt({ hash })
        setIsSubmitting(false)

        if (receipt.status === 'reverted') {
          alert('Transaction reverted')
          return
        }

        alert('Minted!')
      }

      void handle()
    },
    [client, writeContractAsync, token],
  )

  return (
    <form onSubmit={handleSubmit}>
      <button className={styles.button} disabled={isSubmitting}>
        Mint for {formatEther(BigInt(token.price))} $↑
      </button>
    </form>
  )
}
