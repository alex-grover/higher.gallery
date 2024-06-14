import { Frog } from 'frog'
import { vars } from '@/lib/ui'

export const app = new Frog({
  ui: { vars },
  imageAspectRatio: '1:1',
  imageOptions: {
    height: 1000,
    width: 1000,
  },
})
