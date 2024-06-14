import { createEnv } from '@t3-oss/env-nextjs'
import { base, baseSepolia } from 'viem/chains'
import { z } from 'zod'

export const env = createEnv({
  server: {
    APP_URL: z.string().url(),
    IPFS_GATEWAY_BASE_URL: z.string().url(),
    PONDER_URL: z.string().url(),
    VERCEL_ENV: z.enum(['production', 'preview', 'development']),
  },
  experimental__runtimeEnv: {},
})

export const chain = env.VERCEL_ENV === 'production' ? base : baseSepolia
