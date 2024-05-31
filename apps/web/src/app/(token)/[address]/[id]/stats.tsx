'use client'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'
import { ListTokenMintsResponse } from '@/app/api/tokens/[address]/[id]/mints/route'
import { TokenQuery } from '@/generated/ponder'

// eslint-disable-next-line import/no-named-as-default-member
dayjs.extend(relativeTime)

type StatsProps = {
  token: NonNullable<TokenQuery['token']>
}

export function Stats({ token }: StatsProps) {
  const mintEndTime = useMemo(
    () => token.endTimestamp && new Date(Number(token.endTimestamp) * 1000),
    [token.endTimestamp],
  )
  const [timeRemaining, setTimeRemaining] = useState(
    mintEndTime && dayjs(mintEndTime).fromNow(true),
  )

  useEffect(() => {
    if (!mintEndTime) return

    const interval = setInterval(() => {
      setTimeRemaining(dayjs(mintEndTime).fromNow(true))
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [mintEndTime])

  const { data } = useSWR<ListTokenMintsResponse>(
    `/api/tokens/${token.collection.id}/${token.tokenId}/mints`,
    { refreshInterval: 10000 },
  )

  return (
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
  )
}
