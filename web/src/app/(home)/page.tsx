'use client'

import { Masonry } from 'masonic'
import { data } from './data'
import { Nft } from './nft'

export default function HomePage() {
  return (
    <main>
      <Masonry items={data} render={Nft} columnWidth={240} columnGutter={8} />
    </main>
  )
}
