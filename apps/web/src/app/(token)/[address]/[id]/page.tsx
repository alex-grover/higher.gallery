import { notFound } from 'next/navigation'
import { z } from 'zod'
import { ponderClient } from '@/lib/ponder'
import { NextPageContext } from '@/lib/types/next'
import { formatIpfsUri } from '@/lib/utils/ipfs'
import { address as addressSchema } from '@/lib/zod/address'
import { Activity } from './activity'
import { MintButton } from './mint-button'
import { MintInfoSection } from './mint-info-section'
import styles from './page.module.css'

export const revalidate = 86400 // One day in seconds

const schema = z.object({
  address: addressSchema,
  id: z.string().pipe(z.coerce.bigint().positive()),
})

export default async function TokenPage({ params }: NextPageContext) {
  const parseResult = schema.safeParse(params)
  if (!parseResult.success) notFound()
  const { address, id } = parseResult.data

  const { token } = await ponderClient.token({
    token: `${address}-${id.toString()}`,
  })

  if (!token) notFound()

  return (
    <main className={styles.container}>
      <div className={styles.image}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={formatIpfsUri(token.image, 1000)} alt="TokenCard image" />
      </div>
      <div className={styles.details}>
        <div className={styles.metadata}>
          <div className={styles.name}>{token.name}</div>
          <div className={styles.artist}>{token.collection.creatorAddress}</div>
          <div className={styles.collection}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={formatIpfsUri(token.collection.image, 1000)}
              alt="Collection image"
            />
            <div>{token.collection.name}</div>
          </div>
        </div>
        <MintButton token={token} />
        <MintInfoSection token={token} />
        <Activity token={token} />
      </div>
    </main>
  )
}
