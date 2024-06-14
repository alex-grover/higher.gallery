import { env } from '@/env'

export function formatIpfsUri(ipfsUri: string, width?: number) {
  if (!width) return ipfsUri.replace('ipfs://', env.IPFS_GATEWAY_BASE_URL)

  const params = new URLSearchParams({
    'img-width': width.toString(),
    'img-fit': 'scale-down',
  })
  return `${ipfsUri.replace('ipfs://', env.IPFS_GATEWAY_BASE_URL)}?${params.toString()}`
}
