import { useRouter } from 'next/navigation'
import { FormEvent, useCallback, useState } from 'react'
import { mutate } from 'swr'
import useSWRImmutable from 'swr/immutable'
import { Address, parseEther } from 'viem'
import { usePublicClient } from 'wagmi'
import { GetCollectionResponse } from '@/app/api/collections/[address]/route'
import { higher1155Abi, useWriteHigher1155Create } from '@/generated/wagmi'
import { uploadJSON, useUploadFile } from '@/lib/ipfs'
import styles from './create-token-form.module.css'

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
        const mintDuration = data.get('mintDuration')

        if (
          typeof name !== 'string' ||
          typeof description !== 'string' ||
          typeof price !== 'string' ||
          typeof maxSupply !== 'string' ||
          typeof mintDuration !== 'string'
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
              price: parseEther(price),
              maxSupply: BigInt(maxSupply),
              endTimestamp:
                BigInt(Math.floor(new Date().valueOf() / 1000)) +
                BigInt(mintDuration) * 24n * 60n * 60n,
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
    <>
      <h1 className={styles.heading}>Create</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label htmlFor="image" className={styles.upload}>
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="Image preview" />
            ) : isUploading ? (
              <div>uploading...</div>
            ) : (
              <div>upload ↑</div>
            )}
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={upload}
            className={styles.file}
          />
          {error && <div className={styles.error}>{error}</div>}
        </div>
        <div className={styles.inputs}>
          <div className={styles.section}>
            <h2 className={styles.subheading}>Details</h2>
            <input id="name" name="name" placeholder="Name" autoFocus />
            <textarea
              name="description"
              placeholder="Description"
              rows={6}
              className={styles.textarea}
            />
          </div>
          <div className={styles.section}>
            <h2 className={styles.subheading}>Mint settings</h2>
            <label htmlFor="price" className={styles.label}>
              <span>Price (in $HIGHER)</span>
              <input id="price" name="price" placeholder="50" />
            </label>
            <label htmlFor="maxSupply" className={styles.label}>
              <span>Edition size</span>
              <input
                id="maxSupply"
                name="maxSupply"
                placeholder="Leave empty for unlimited"
              />
            </label>
            <label htmlFor="mintDuration" className={styles.label}>
              <span>Mint duration (in days)</span>
              <input
                id="mintDuration"
                name="mintDuration"
                placeholder="Leave empty for untimed"
              />
            </label>
          </div>
          <button disabled={isSubmitting} className={styles.button}>
            Create
          </button>
        </div>
      </form>
    </>
  )
}
