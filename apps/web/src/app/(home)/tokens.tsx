'use client'

import { Masonry } from 'masonic'
import useSWR from 'swr'
import { TokenListResponse } from '@/app/api/tokens/route'
import { Token } from './token'

type TokensProps = TokenListResponse

export function Tokens(fallback: TokensProps) {
  const { data } = useSWR<TokenListResponse>('/api/tokens', {
    fallback,
  })

  if (!data) return null

  return (
    <Masonry
      items={data.tokens}
      render={Token}
      columnWidth={240}
      columnGutter={8}
      tabIndex={-1}
    />
  )
}
