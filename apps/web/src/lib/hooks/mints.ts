import useSWR from 'swr'
import { ListTokenMintsResponse } from '@/app/api/tokens/[address]/[id]/mints/route'
import { TokenQuery } from '@/generated/ponder'

type Token = NonNullable<TokenQuery['token']>

export function useMints(token: Token) {
  const { data: mints, mutate } = useSWR<ListTokenMintsResponse>(
    `/api/tokens/${token.collection.id}/${token.tokenId}/mints`,
    { refreshInterval: 10000 },
  )

  return {
    mints,
    mutate,
  }
}
