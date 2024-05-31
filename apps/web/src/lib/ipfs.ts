import { ChangeEventHandler, useCallback, useMemo, useState } from 'react'
import { env } from '@/env'
import { JSONValue } from '@/lib/types/json'

export function useUploadFile() {
  const [preview, setPreview] = useState<string | null>(null)
  const [uri, setUri] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const upload: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    async function execute() {
      if (!event.target.files?.length) return
      const file = event.target.files.item(0)
      if (!file?.size) return

      if (!file.type.includes('image/')) {
        setError('File must be an image')
        return
      }

      if (file.size > 1000000000) {
        setError('Maximum file size: 1GB')
        return
      }

      setIsUploading(true)
      setError(null)

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

      setIsUploading(false)

      if (!response.ok) {
        setError('Error uploading image to IPFS')
        return
      }

      setPreview(URL.createObjectURL(file))

      const { IpfsHash: hash } = (await response.json()) as {
        IpfsHash: string
      }

      setUri(`ipfs://${hash}`)
    }

    void execute()
  }, [])

  return useMemo(
    () => ({ upload, preview, uri, isUploading, error }),
    [upload, preview, uri, isUploading, error],
  )
}

export async function uploadJSON(data: JSONValue) {
  const response = await fetch(
    'https://api.pinata.cloud/pinning/pinJSONToIPFS',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.NEXT_PUBLIC_PINATA_JWT}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pinataContent: data,
      }),
    },
  )

  if (!response.ok) throw new Error('Error uploading metadata to IPFS')

  const { IpfsHash: hash } = (await response.json()) as {
    IpfsHash: string
  }

  return `ipfs://${hash}`
}
