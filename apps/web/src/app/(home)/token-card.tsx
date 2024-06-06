import { type RenderComponentProps } from 'masonic'
import Link from 'next/link'
import { ListTokensResponse } from '@/app/api/tokens/route'
import { truncateEthAddress } from '@/lib/utils/address'
import { formatIpfsUri } from '@/lib/utils/ipfs'
import styles from './token-card.module.css'

type TokenProps = RenderComponentProps<ListTokensResponse['tokens'][number]>

export function TokenCard({ data: token }: TokenProps) {
  return (
    <Link
      href={`/${token.collection.id}/${token.tokenId.toString()}`}
      className={styles.container}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={
          token.image.startsWith('ipfs://')
            ? formatIpfsUri(token.image, 480)
            : token.image
        }
        alt="Token image"
        loading="lazy"
      />
      <div className={styles.overlay}>
        <div className={styles.name}>{token.name}</div>
        <div className={styles.artist}>
          {truncateEthAddress(token.collection.creatorAddress)}
        </div>
      </div>
    </Link>
  )
}
