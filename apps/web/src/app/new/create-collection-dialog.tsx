import { PlusIcon } from '@radix-ui/react-icons'
import { CloseIcon } from 'next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon'
import { useRouter } from 'next/navigation'
import { FormEvent, useCallback, useRef, useState } from 'react'
import { mutate } from 'swr'
import { Address } from 'viem'
import { usePublicClient } from 'wagmi'
import { chain } from '@/env'
import {
  higher1155FactoryAbi,
  higher1155FactoryAddress,
  useWriteHigher1155FactoryDeploy,
} from '@/generated/wagmi'
import { uploadJSON, useUploadFile } from '@/lib/ipfs'
import styles from './create-collection-dialog.module.css'

type CollectionDialogProps = {
  address: Address
}

export function CreateCollectionDialog({ address }: CollectionDialogProps) {
  const router = useRouter()
  const client = usePublicClient()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const ref = useRef<HTMLDialogElement | null>(null)
  const handleOpen = useCallback(() => {
    if (!ref.current) return
    ref.current.showModal()
  }, [])
  const handleClose = useCallback(() => {
    if (!ref.current) return
    ref.current.close()
  }, [])

  const { upload, preview, uri: image, isUploading, error } = useUploadFile()

  const { writeContractAsync } = useWriteHigher1155FactoryDeploy()

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

        if (typeof name !== 'string' || typeof description !== 'string') {
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
          address: higher1155FactoryAddress[chain.id],
          abi: higher1155FactoryAbi,
          functionName: 'deploy',
          args: [uri],
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

        await mutate(`/api/users/${address}/collections`)

        router.push(
          `/new?${new URLSearchParams({ collectionAddress: result }).toString()}`,
        )
      }

      void handle()
    },
    [client, image, writeContractAsync, address, router],
  )

  return (
    <>
      <button onClick={handleOpen} className={styles.trigger}>
        <PlusIcon />
        <span>New collection</span>
      </button>
      <dialog ref={ref} className={styles.dialog}>
        <div className={styles.header}>
          <h2 className={styles.heading}>New collection</h2>
          <button onClick={handleClose} className={styles.close}>
            <CloseIcon />
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.content}>
            <label htmlFor="image" className={styles.upload}>
              {preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={preview} alt="Image preview" />
              ) : isUploading ? (
                <div>uploading...</div>
              ) : (
                <div>upload ↑</div>
              )}
              <input
                type="file"
                id="image"
                name="image"
                onChange={upload}
                className={styles.file}
              />
              {error && <div>{error}</div>}
            </label>
            <div className={styles.inputs}>
              <input name="name" placeholder="Name" autoFocus />
              <textarea
                name="description"
                placeholder="Description"
                rows={4}
                className={styles.textarea}
              />
            </div>
          </div>
          <button disabled={isSubmitting} className={styles.submit}>
            Create
          </button>
        </form>
      </dialog>
    </>
  )
}
