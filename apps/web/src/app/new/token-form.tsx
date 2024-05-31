import { useRouter } from 'next/navigation'
import { FormEvent, useCallback } from 'react'
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

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // TODO: implement
    // Upload metadata to IPFS
    // Submit create token tx
    // Revalidate token list
    // Push to token page
  }, [])

  if (isLoading) return null

  if (!data || data.creatorAddress !== address) {
    router.replace('/new')
    return null
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="image" />
      <div>
        <input autoFocus name="name" placeholder="Name" />
        <textarea name="description" placeholder="Description" />
        <input name="price" placeholder="Price" />
        <input name="maxSupply" placeholder="Supply limit" />
        <input name="endTimestamp" placeholder="Time limit" />
      </div>
      <button>Create</button>
    </form>
  )
}
