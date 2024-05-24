'use client'

import { Masonry, RenderComponentProps } from 'masonic'
import styles from './page.module.css'

const items = Array(5000).fill(null).map((_, index) => ({ id: index }))

export default function Home() {
  return (
    <main className={styles.main}>
      <Masonry items={items} render={MasonryCard} columnWidth={280} columnGutter={8} />
    </main>
  )
}

const MasonryCard = ({ index, data: { id }, width }: RenderComponentProps<typeof items[number]>) => (
  <div style={{ background: 'red' }}>
    <div>Index: {index}</div>
    <pre>ID: {id}</pre>
    <div>Column width: {width}</div>
  </div>
)