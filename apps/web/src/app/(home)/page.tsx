'use client'

import { Masonry } from 'masonic'
import useSWR from 'swr'
import { TokenListResponse } from '@/app/api/tokens/route'
import { Token } from './token'

export default function HomePage() {
  const { data } = useSWR<TokenListResponse>('/api/tokens')

  if (!data) return null

  return (
    <main>
      <Masonry
        items={data.tokens}
        render={Token}
        columnWidth={240}
        columnGutter={8}
        tabIndex={-1}
      />
    </main>
  )
}
