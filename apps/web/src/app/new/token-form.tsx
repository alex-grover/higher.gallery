import { useRouter } from 'next/navigation'
import useSWRImmutable from 'swr/immutable'
import { Address } from 'viem'
import { CollectionDetailResponse } from '@/app/api/collections/[address]/route'

type TokenFormProps = {
  address: Address
  collectionAddress: Address
}

export function TokenForm({ address, collectionAddress }: TokenFormProps) {
  const router = useRouter()
  const { data, isLoading } = useSWRImmutable<CollectionDetailResponse>(
    `/api/collections/${collectionAddress}`,
    { shouldRetryOnError: false },
  )

  if (isLoading) return null

  if (!data || data.creatorAddress !== address) {
    router.replace('/new')
    return null
  }

  return (
    <form>
      <div>TODO: asset</div>
      <div>
        <div>TODO: name, description</div>
        <div>TODO: price</div>
        <div>TODO: time, supply limit</div>
      </div>
    </form>
  )
}
