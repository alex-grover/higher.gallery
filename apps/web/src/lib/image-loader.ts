'use client'

import { ImageLoaderProps } from 'next/image'

export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  const params = new URLSearchParams({
    'img-width': width.toString(),
    'img-fit': 'scale-down',
  })
  if (quality) params.set('img-dpr', quality.toString())
  return `${src}?${params.toString()}`
}
