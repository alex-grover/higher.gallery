'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useAccount } from 'wagmi'
import { CollectionStep } from '@/app/new/collection-step'
import { TokenForm } from '@/app/new/token-form'
import { address } from '@/lib/zod/address'

export default function CreatePage() {
  const account = useAccount()
  const router = useRouter()
  const searchParams = useSearchParams()

  if (account.status === 'connecting' || account.status === 'reconnecting')
    return null
  if (account.status === 'disconnected') {
    router.replace('/')
    return null
  }

  const parseResult = address.safeParse(searchParams.get('collectionAddress'))

  return (
    <main>
      {parseResult.success ? (
        <TokenForm
          address={account.address}
          collectionAddress={parseResult.data}
        />
      ) : (
        <CollectionStep address={account.address} />
      )}
    </main>
  )
}
