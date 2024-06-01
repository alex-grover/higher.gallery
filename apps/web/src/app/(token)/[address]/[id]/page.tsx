import { notFound } from 'next/navigation'
import { z } from 'zod'
import { ponderClient } from '@/lib/ponder'
import { NextPageContext } from '@/lib/types/next'
import { truncateEthAddress } from '@/lib/utils/address'
import { formatIpfsUri } from '@/lib/utils/ipfs'
import { address as addressSchema } from '@/lib/zod/address'
import { Activity } from './activity'
import { MintSection } from './mint-section'
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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={formatIpfsUri(token.image, 1000)}
        alt="TokenCard image"
        className={styles.image}
      />
      <div className={styles.details}>
        <div className={styles.metadata}>
          <div className={styles.name}>{token.name}</div>
          <div className={styles.collection}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={formatIpfsUri(token.collection.image, 1000)}
              alt="Collection image"
              className={styles.thumbnail}
            />
            <div className={styles.ids}>
              <div className={styles.artist}>
                {truncateEthAddress(
                  addressSchema.parse(token.collection.creatorAddress),
                )}
              </div>
              <div className={styles.collection}>{token.collection.name}</div>
            </div>
          </div>
        </div>
        <MintSection token={token} />
        <Activity token={token} />
      </div>
    </main>
  )
}
