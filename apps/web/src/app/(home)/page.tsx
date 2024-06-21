'use client'

import { AspectRatio, Grid, Skeleton } from '@radix-ui/themes'
import { Masonry } from 'masonic'
import useSWR from 'swr'
import { ListTokensResponse } from '@/app/api/tokens/route'
import { PageContainer } from '@/components/container/container'
import styles from './page.module.css'
import { TokenCard } from './token-card'

export default function HomePage() {
  const { data } = useSWR<ListTokensResponse>('/api/tokens')

  return (
    <PageContainer>
      {data ? (
        <Masonry
          items={data.tokens}
          render={TokenCard}
          columnWidth={240}
          columnGutter={8}
          tabIndex={-1}
          className={styles.masonry}
        />
      ) : (
        <Grid columns="repeat(auto-fill, minmax(240px, 1fr))" gap="2">
          {Array(25)
            .fill(null)
            .map((_, i) => (
              <Skeleton
                key={i}
                loading
                height="100%"
                className={styles.skeleton}
              >
                <AspectRatio />
              </Skeleton>
            ))}
        </Grid>
      )}
    </PageContainer>
  )
}
