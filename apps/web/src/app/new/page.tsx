'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { useAccount } from 'wagmi'
import { address } from '@/lib/zod/address'
import { CollectionStep } from './collection-step'
import { CreateTokenForm } from './create-token-form'

export default function CreatePage() {
  return (
    <Suspense>
      <CreatePageContents />
    </Suspense>
  )
}

function CreatePageContents() {
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
        <CreateTokenForm
          address={account.address}
          collectionAddress={parseResult.data}
        />
      ) : (
        <CollectionStep address={account.address} />
      )}
    </main>
  )
}
