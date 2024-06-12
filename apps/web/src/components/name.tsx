'use client'

import { Skeleton } from '@radix-ui/themes'
import useSWRImmutable from 'swr/immutable'
import { Address } from 'viem'
import { GetUserResponse } from '@/app/api/users/[address]/route'
import { truncateEthAddress } from '@/lib/utils/address'

type NameProps = {
  address?: Address
}

export function Name({ address }: NameProps) {
  const { data, isLoading } = useSWRImmutable<GetUserResponse>(
    address && `/api/users/${address}`,
  )

  if (!address)
    return truncateEthAddress('0x0000000000000000000000000000000000000000')

  return (
    <Skeleton loading={isLoading}>
      {data?.ensName ?? truncateEthAddress(address)}
    </Skeleton>
  )
}
