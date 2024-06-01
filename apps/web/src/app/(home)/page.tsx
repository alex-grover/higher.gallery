'use client'

import { Masonry } from 'masonic'
import useSWR from 'swr'
import { ListTokensResponse } from '@/app/api/tokens/route'
import { TokenCard } from './token-card'

export default function HomePage() {
  const { data } = useSWR<ListTokensResponse>('/api/tokens')

  if (!data) return null

  return (
    <main>
      <Masonry
        items={data.tokens}
        render={TokenCard}
        columnWidth={240}
        columnGutter={8}
        tabIndex={-1}
      />
    </main>
  )
}
