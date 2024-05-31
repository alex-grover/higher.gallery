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
      <div>TODO: asset</div>
      <div>
        <input autoFocus placeholder="Name" />
        <textarea placeholder="Description" />
        <input placeholder="Price" />
        <input placeholder="Supply limit" />
        <input placeholder="Time limit" />
      </div>
      <button>Create</button>
    </form>
  )
}
