import { type RenderComponentProps } from 'masonic'
import Link from 'next/link'
import { TokenListResponse } from '@/app/api/tokens/route'
import styles from './token.module.css'

type TokenProps = RenderComponentProps<TokenListResponse['tokens'][number]>

export function Token({ data: token }: TokenProps) {
  return (
    <Link
      href={`/${token.collection.id}/${token.tokenId.toString()}`}
      className={styles.container}
    >
      <div className={styles.overlay}>
        <div className={styles.name}>{token.name}</div>
        <div className={styles.artist}>{token.collection.creatorAddress}</div>
      </div>
    </Link>
  )
}
