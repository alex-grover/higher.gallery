import { notFound } from 'next/navigation'
import { formatEther } from 'viem'
import { z } from 'zod'
import { ponderClient } from '@/lib/ponder'
import { NextRouteContext } from '@/lib/types/next'
import { address as addressSchema } from '@/lib/zod/address'
import styles from './page.module.css'

export const revalidate = 86400 // One day in seconds

const schema = z.object({
  address: addressSchema,
  id: z.string().pipe(z.coerce.bigint().positive()),
})

export default async function TokenPage({ params }: NextRouteContext) {
  const parseResult = schema.safeParse(params)
  if (!parseResult.success) notFound()
  const { address, id } = parseResult.data

  const { higher1155Token: token } = await ponderClient.token({
    token: `${address}-${id.toString()}`,
  })

  if (!token) notFound()

  return (
    <main className={styles.container}>
      <div className={styles.image}>TODO: image</div>
      <div className={styles.details}>
        <div className={styles.metadata}>
          <div className={styles.name}>{token.name}</div>
          <div className={styles.artist}>
            {token.higher1155Collection.creatorAddress}
          </div>
          <div className={styles.collection}>
            {token.higher1155Collection.name} TODO: collection image
          </div>
        </div>
        <button className={styles.button}>
          Mint for {formatEther(BigInt(token.price))} $↑
        </button>
        <div>TODO: time remaining, mint count, supply limit</div>
        <div>TODO: comment feed</div>
      </div>
    </main>
  )
}
