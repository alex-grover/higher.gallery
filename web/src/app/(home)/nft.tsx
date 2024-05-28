import { RenderComponentProps } from 'masonic'
import { data } from './data'
import styles from './nft.module.css'

type NftProps = RenderComponentProps<typeof data[number]>

export function Nft({ data: { id } }: NftProps) {
  return (
    <div className={styles.container}>
      <div className={styles.overlay}>
        <div className={styles.name}>TODO: name</div>
        <div className={styles.artist}>TODO: artist</div>
      </div>
    </div>
  )
}
