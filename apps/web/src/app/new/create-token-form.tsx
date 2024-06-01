import { useRouter } from 'next/navigation'
import { FormEvent, useCallback, useState } from 'react'
import { mutate } from 'swr'
import useSWRImmutable from 'swr/immutable'
import { Address } from 'viem'
import { usePublicClient } from 'wagmi'
import { GetCollectionResponse } from '@/app/api/collections/[address]/route'
import { higher1155Abi, useWriteHigher1155Create } from '@/generated/wagmi'
import { uploadJSON, useUploadFile } from '@/lib/ipfs'

type CreateTokenFormProps = {
  address: Address
  collectionAddress: Address
}

export function CreateTokenForm({
  address,
  collectionAddress,
}: CreateTokenFormProps) {
  const router = useRouter()
  const client = usePublicClient()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const { data, isLoading } = useSWRImmutable<GetCollectionResponse>(
    `/api/collections/${collectionAddress}`,
    { shouldRetryOnError: false },
  )

  const { upload, preview, uri: image, isUploading, error } = useUploadFile()

  const { writeContractAsync } = useWriteHigher1155Create()

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      async function handle() {
        if (!client) {
          alert('Error getting client')
          return
        }

        const data = new FormData(event.currentTarget)
        const name = data.get('name')
        const description = data.get('description')
        const price = data.get('price')
        const maxSupply = data.get('maxSupply')
        const endTimestamp = data.get('endTimestamp')

        if (
          typeof name !== 'string' ||
          typeof description !== 'string' ||
          typeof price !== 'string' ||
          typeof maxSupply !== 'string' ||
          typeof endTimestamp !== 'string'
        ) {
          alert('Invalid form data')
          return
        }

        setIsSubmitting(true)

        let uri
        try {
          uri = await uploadJSON({
            name,
            description,
            image,
          })
        } catch (e) {
          const error = e as Error
          alert(error.message)
          setIsSubmitting(false)
          return
        }

        const { request, result } = await client.simulateContract({
          account: address,
          address: collectionAddress,
          abi: higher1155Abi,
          functionName: 'create',
          args: [
            uri,
            {
              price: BigInt(price),
              maxSupply: BigInt(maxSupply),
              endTimestamp: BigInt(endTimestamp),
            },
          ],
        })

        const hash = await writeContractAsync(request)

        const receipt = await client.waitForTransactionReceipt({
          hash,
          confirmations: 5,
        })
        if (receipt.status === 'reverted') {
          alert('Transaction reverted')
          setIsSubmitting(false)
          return
        }

        await mutate(`/api/tokens`)

        router.push(`/${collectionAddress}/${result.toString()}`)
      }

      void handle()
    },
    [client, image, writeContractAsync, address, collectionAddress, router],
  )

  if (isLoading) return null

  if (!data || data.creatorAddress !== address) {
    router.replace('/new')
    return null
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="image">
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="Image preview" />
        ) : (
          <div>{isUploading ? 'Uploading...' : 'Upload'}</div>
        )}
      </label>
      <input type="file" id="image" name="image" onChange={upload} />
      {error && <div>{error}</div>}
      <div>
        <input autoFocus name="name" placeholder="Name" />
        <textarea name="description" placeholder="Description" />
        <input name="price" placeholder="Price" />
        <input name="maxSupply" placeholder="Supply limit" />
        <input name="endTimestamp" placeholder="Time limit" />
      </div>
      <button disabled={isSubmitting}>Create</button>
    </form>
  )
}
