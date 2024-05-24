import { RenderComponentProps } from 'masonic'
import { data } from './data'
import styles from './nft.module.css'

export function Nft({ index, data: { id }, width }: RenderComponentProps<typeof data[number]>) {
  return (
    <div className={styles.container}>
      <div>Index: {index}</div>
      <pre>ID: {id}</pre>
      <div>Column width: {width}</div>
    </div>
  )
}
