'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { useAccount } from 'wagmi'
import { z } from 'zod'
import { PageContainer } from '@/components/container'
import { address } from '@/lib/zod/address'
import { CollectionStep } from './collection-step'
import { CreateTokenForm } from './create-token-form'

const schema = z.union([
  z.object({ collectionAddress: address }),
  z.object({ contractURI: z.string().min(1) }),
])

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

  const parseResult = schema.safeParse(
    Object.fromEntries(searchParams.entries()),
  )

  if (parseResult.success)
    return (
      <PageContainer>
        <CreateTokenForm address={account.address} {...parseResult.data} />
      </PageContainer>
    )

  return (
    <PageContainer size="2">
      <CollectionStep address={account.address} />
    </PageContainer>
  )
}
