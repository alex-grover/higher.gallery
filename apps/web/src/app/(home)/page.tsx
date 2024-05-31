'use client'

import { Masonry } from 'masonic'
import { useEffect, useState } from 'react'
import { data } from './data'
import { Nft } from './nft'

export default function HomePage() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <main>
      {isMounted && (
        <Masonry
          items={data}
          render={Nft}
          columnWidth={240}
          columnGutter={8}
          tabIndex={-1}
        />
      )}
    </main>
  )
}
