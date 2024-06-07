'use client'

import { Masonry } from 'masonic'
import useSWR from 'swr'
import { ListTokensResponse } from '@/app/api/tokens/route'
import { PageContainer } from '@/components/container'
import { address } from '@/lib/zod/address'
import { BigIntString } from '@/lib/zod/bigint'
import styles from './page.module.css'
import { TokenCard } from './token-card'

export default function HomePage() {
  const { data } = useSWR<ListTokensResponse>('/api/tokens')

  if (!data) return null

  const tokens = [
    ...data.tokens,
    ...PLACEHOLDER_IMAGES.map((image) => ({
      collection: {
        id: address.parse('0x0000000000000000000000000000000000000000'),
        creatorAddress: address.parse(
          '0x0000000000000000000000000000000000000000',
        ),
      },
      tokenId: '0' as BigIntString,
      name: 'Placeholder',
      image,
    })),
  ]

  return (
    <PageContainer>
      <Masonry
        items={tokens}
        render={TokenCard}
        columnWidth={240}
        columnGutter={8}
        tabIndex={-1}
        className={styles.masonry}
      />
    </PageContainer>
  )
}

const PLACEHOLDER_IMAGES = [
  'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/a94a995e-c8a5-406d-e305-9fc555248300/rectcontain3',
  'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/94a2195e-f7fe-4004-7bea-e8ee90595600/rectcontain3',
  'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/ee3a7f30-8b17-4e4f-f764-7f3520266c00/rectcontain3',
  'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/f0e019b2-dcda-4f63-c650-51012f6ad400/rectcontain3',
  'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/aad04ded-12e0-46b1-db51-48f4432f2700/rectcontain3',
  'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/4f97f39c-8e6b-4594-54b4-eb4faeb55200/rectcontain3',
  'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/1fbad214-0180-4af3-2957-4d922e1e2900/rectcontain3',
  'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/930d1f5e-05f2-4082-a65f-cba47352f300/rectcontain3',
  'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/75d94c6f-d7c7-45c6-cdb1-ada6d0e44400/rectcontain3',
  'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/4a5d06fb-3970-4e86-4c96-775d0a1f2200/rectcontain3',
  'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/763a3b09-432e-4b5a-4ea0-98d7caf06a00/rectcontain3',
  'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/0d0d0f4a-3154-4297-e433-3481a59eaa00/rectcontain3',
  'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/3517064a-c022-4167-46b4-98d6d9514400/rectcontain3',
  'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/9b917e51-c118-4204-4a90-2088e596aa00/rectcontain3',
  'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/3382f0ac-3b48-41f1-7db5-b09536a22d00/rectcontain3',
]
