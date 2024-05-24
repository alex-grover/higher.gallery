'use client'

import { Masonry } from 'masonic'
import { data } from './data'
import { Nft } from './nft'
import styles from './page.module.css'

export default function HomePage() {
  return (
    <main className={styles.main}>
      <Masonry items={data} render={Nft} columnWidth={280} columnGutter={8} />
    </main>
  )
}
