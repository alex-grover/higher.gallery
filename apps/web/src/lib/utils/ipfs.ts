import { env } from '@/env'

export function formatIpfsUri(ipfsUri: string, width: number) {
  return ipfsUri.replace('ipfs://', 'https://ipfs.io/ipfs/')

  const params = new URLSearchParams({
    'img-width': width.toString(),
    'img-fit': 'scale-down',
  })
  return `${ipfsUri.replace('ipfs://', env.NEXT_PUBLIC_IPFS_GATEWAY_BASE_URL)}?${params.toString()}`
}
