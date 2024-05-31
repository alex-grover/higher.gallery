'use client'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'
import { formatEther } from 'viem'
import { ListTokenMintsResponse } from '@/app/api/tokens/[address]/[id]/mints/route'
import { TokenQuery } from '@/generated/ponder'
import styles from './mint.module.css'

// eslint-disable-next-line import/no-named-as-default-member
dayjs.extend(relativeTime)

type MintConfigProps = {
  token: NonNullable<TokenQuery['token']>
}

export function Mint({ token }: MintConfigProps) {
  const to = useMemo(
    () => token.endTimestamp && new Date(Number(token.endTimestamp) * 1000),
    [token.endTimestamp],
  )
  const [timeRemaining, setTimeRemaining] = useState(
    to && dayjs(to).fromNow(true),
  )

  useEffect(() => {
    if (!to) return

    const interval = setInterval(() => {
      setTimeRemaining(dayjs(to).fromNow(true))
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [to])

  const { data } = useSWR<ListTokenMintsResponse>(
    `/api.tokens/${token.collection.id}/${token.tokenId}`,
    { refreshInterval: 10000 },
  )

  return (
    <>
      <button
        className={styles.button}
        disabled={
          !data || data.count === token.maxSupply || (!!to && to > new Date())
        }
      >
        Mint for {formatEther(BigInt(token.price))} $↑
      </button>
      <div>
        {timeRemaining && (
          <>
            <span>{timeRemaining} remaining</span>
            <span> &bull; </span>
          </>
        )}
        <span>
          {data?.count}
          {token.maxSupply && ` / ${token.maxSupply}`} minted
        </span>
      </div>
    </>
  )
}
