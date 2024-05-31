import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useCallback, useRef, useState } from 'react'
import { mutate } from 'swr'
import { Address } from 'viem'
import { env } from '@/env'
import { useWriteIHigher1155FactoryDeploy } from '@/generated/wagmi'

type CollectionDialogProps = {
  address: Address
}

export function CollectionDialog({ address }: CollectionDialogProps) {
  const router = useRouter()
  const ref = useRef<HTMLDialogElement | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [image, setImage] = useState<string | null>(null)
  const [imageError, setImageError] = useState<string | null>(null)

  const handleOpen = useCallback(() => {
    if (!ref.current) return
    ref.current.showModal()
  }, [])

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      async function handle() {
        if (!event.target.files?.length) return
        const file = event.target.files.item(0)
        if (!file?.size) return

        if (!file.type.includes('image/')) {
          setImageError('Invalid file type')
          return
        }

        if (file.size > 1000000000) {
          setImageError('Image must be less than 1Gb')
          return
        }

        setUploadingImage(true)
        setImageError('')

        const data = new FormData()
        data.set('file', file)
        const response = await fetch(
          'https://api.pinata.cloud/pinning/pinFileToIPFS',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${env.NEXT_PUBLIC_PINATA_JWT}`,
            },
            body: data,
          },
        )

        setUploadingImage(false)

        if (!response.ok) {
          alert('Error uploading image to IPFS')
          return
        }

        setImagePreview(URL.createObjectURL(file))

        const { IpfsHash: hash } = (await response.json()) as {
          IpfsHash: string
        }

        setImage(`ipfs://${hash}`)
      }

      void handle()
    },
    [],
  )

  const { writeContractAsync } = useWriteIHigher1155FactoryDeploy()

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      async function handle() {
        const data = new FormData(event.currentTarget)

        const response = await fetch(
          'https://api.pinata.cloud/pinning/pinJSONToIPFS',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${env.NEXT_PUBLIC_PINATA_JWT}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              pinataContent: {
                name: data.get('name'),
                description: data.get('description'),
                image,
              },
            }),
          },
        )

        if (!response.ok) throw new Error('Error uploading metadata to IPFS')

        const { IpfsHash: hash } = (await response.json()) as {
          IpfsHash: string
        }

        const collectionAddress = await writeContractAsync({
          args: [`ipfs://${hash}`],
        })

        await mutate(`/api/users/${address}/collections`)

        router.push(
          `/new?${new URLSearchParams({ collectionAddress }).toString()}`,
        )
      }

      void handle()
    },
    [image, writeContractAsync, address, router],
  )

  return (
    <>
      <button onClick={handleOpen}>Create new</button>
      <dialog ref={ref}>
        <form onSubmit={handleSubmit}>
          <label>
            {imagePreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imagePreview} alt="Image preview" />
            ) : (
              <div>{uploadingImage ? 'Uploading...' : 'Upload'}</div>
            )}
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
          />
          {imageError && <div>{imageError}</div>}
          <input name="name" placeholder="Name" autoFocus />
          <textarea name="description" placeholder="Description" />
          <button>Create</button>
        </form>
      </dialog>
    </>
  )
}
