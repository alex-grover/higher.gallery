// https://github.com/family/connectkit/blob/main/packages/connectkit/src/utils/index.ts#L4-L11

import { Address } from 'viem'

const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/

export function truncateEthAddress(address: Address, separator = '••••') {
  const match = address.match(truncateRegex)
  if (!match) return address
  return `${match[1]}${separator}${match[2]}`
}
