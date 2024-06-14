import { Frog } from 'frog'
import { env } from '@/env'
import { vars } from '@/lib/ui'

export const app = new Frog({
  browserLocation: `${env.APP_URL}/:address/:id`,
  ui: { vars },
  imageAspectRatio: '1:1',
  imageOptions: {
    height: 1000,
    width: 1000,
  },
})
