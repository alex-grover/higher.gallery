import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import useSWR from 'swr'
import { TokenMintsResponse } from '@/app/api/tokens/[address]/[id]/mints/route'
import { TokenQuery } from '@/generated/ponder'

// eslint-disable-next-line import/no-named-as-default-member
dayjs.extend(relativeTime)

type MintsProps = {
  token: NonNullable<TokenQuery['token']>
}

export function Mints({ token }: MintsProps) {
  const { data } = useSWR<TokenMintsResponse>(
    `/api.tokens/${token.collection.id}/${token.tokenId}`,
    { refreshInterval: 10000 },
  )

  return (
    <ol>
      {data?.mints.map((mint) => (
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
