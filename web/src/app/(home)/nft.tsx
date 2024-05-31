import { type RenderComponentProps } from 'masonic'
import Link from 'next/link'
import { data } from './data'
import styles from './nft.module.css'

type NftProps = RenderComponentProps<(typeof data)[number]>

export function Nft({ data: { address, id } }: NftProps) {
  return (
    <Link href={`/${address}/${id}`} className={styles.container}>
      <div className={styles.overlay}>
        <div className={styles.name}>TODO: name</div>
        <div className={styles.artist}>TODO: artist</div>
      </div>
    </Link>
  )
}
