'use client'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { TokenQuery } from '@/generated/ponder'
import { useMints } from '@/lib/hooks/mints'
import { truncateEthAddress } from '@/lib/utils/address'
import { address } from '@/lib/zod/address'
import styles from './activity.module.css'

// eslint-disable-next-line import/no-named-as-default-member
dayjs.extend(relativeTime)

type ActivityProps = {
  token: NonNullable<TokenQuery['token']>
}

export function Activity({ token }: ActivityProps) {
  const mints = useMints(token)

  return (
    <ol className={styles.list}>
      {mints?.mints.map((mint) => (
        <li key={mint.id} className={styles.item}>
          <div className={styles.content}>
            <div>
              {truncateEthAddress(address.parse(mint.minterAddress))}
              {BigInt(mint.amount) > 1n && ` x${mint.amount}`}
            </div>
            <div>
              {dayjs(new Date(Number(mint.timestamp) * 1000)).fromNow()}
            </div>
          </div>
          <div className={styles.comment}>{mint.comment}</div>
        </li>
      ))}
    </ol>
  )
}
