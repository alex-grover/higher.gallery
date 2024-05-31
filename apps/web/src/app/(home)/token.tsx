import { type RenderComponentProps } from 'masonic'
import Link from 'next/link'
import { ListTokensResponse } from '@/app/api/tokens/route'
import { truncateEthAddress } from '@/lib/utils/address'
import { formatIpfsUri } from '@/lib/utils/ipfs'
import styles from './token.module.css'

type TokenProps = RenderComponentProps<ListTokensResponse['tokens'][number]>

export function Token({ data: token }: TokenProps) {
  return (
    <Link
      href={`/${token.collection.id}/${token.tokenId.toString()}`}
      className={styles.container}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={formatIpfsUri(token.image, 480)}
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
