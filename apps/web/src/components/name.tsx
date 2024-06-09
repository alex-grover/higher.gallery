'use client'

import { Address } from 'viem'
import { useEnsName } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { truncateEthAddress } from '@/lib/utils/address'

type NameProps = {
  address: Address
}

export function Name({ address }: NameProps) {
  const { data: ensName } = useEnsName({
    address,
    chainId: mainnet.id,
  })

  return ensName ?? truncateEthAddress(address)
}
