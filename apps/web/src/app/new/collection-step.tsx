import Link from 'next/link'
import useSWR from 'swr'
import { Address } from 'viem'
import { ListUserCollectionsResponse } from '@/app/api/users/[address]/collections/route'
import { formatIpfsUri } from '@/lib/utils/ipfs'
import styles from './collection-step.module.css'
import { CreateCollectionDialog } from './create-collection-dialog'

type CollectionStepProps = {
  address: Address
}

export function CollectionStep({ address }: CollectionStepProps) {
  const { data } = useSWR<ListUserCollectionsResponse>(
    `/api/users/${address}/collections`,
  )

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Select a collection</h1>
      <CreateCollectionDialog address={address} />
      {data && data.length > 0 && (
        <ul className={styles.list}>
          {data.map((collection) => (
            <li key={collection.id} className={styles.collection}>
              <Link
                href={`/new?${new URLSearchParams({ collectionAddress: collection.id }).toString()}`}
                className={styles.link}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={formatIpfsUri(collection.image, 48)}
                  alt="Collection image"
                  className={styles.image}
                />
                <div>{collection.name}</div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
