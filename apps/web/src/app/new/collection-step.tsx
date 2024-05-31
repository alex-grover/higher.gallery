import Link from 'next/link'
import useSWR from 'swr'
import { Address } from 'viem'
import { UserCollectionsListResponse } from '@/app/api/users/[address]/collections/route'

type CollectionStepProps = {
  address: Address
}

export function CollectionStep({ address }: CollectionStepProps) {
  const { data } = useSWR<UserCollectionsListResponse>(
    `/api/users/${address}/collections`,
  )

  return (
    <div>
      {/* TODO: create form */}
      <button>Create new</button>
      {data && data.length > 0 && (
        <ul>
          {data.map((collection) => (
            <li key={collection.id}>
              <Link
                href={`/new?${new URLSearchParams({ collectionAddress: collection.id }).toString()}`}
              >
                <div>TODO: collection image</div>
                <div>{collection.name}</div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
