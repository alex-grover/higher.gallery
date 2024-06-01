'use client'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { TokenQuery } from '@/generated/ponder'
import { useMints } from '@/lib/hooks/mints'

// eslint-disable-next-line import/no-named-as-default-member
dayjs.extend(relativeTime)

type ActivityProps = {
  token: NonNullable<TokenQuery['token']>
}

export function Activity({ token }: ActivityProps) {
  const mints = useMints(token)

  return (
    <ol>
      {mints?.mints.map((mint) => (
        <li key={mint.id}>
          <div>
            <div>
              {mint.minterAddress}
              {BigInt(mint.amount) > 1n && ` x${mint.amount}`}
            </div>
            <div>
              {dayjs(new Date(Number(mint.timestamp) * 1000)).fromNow()}
            </div>
          </div>
          <div>{mint.comment}</div>
        </li>
      ))}
    </ol>
  )
}
