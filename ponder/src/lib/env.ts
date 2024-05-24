import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  server: {
    ENV: z.enum(['production', 'preview', 'development']),
    RPC_URL: z.string().url(),
    IPFS_GATEWAY_BASE_URL: z.string().url(),
  },
  runtimeEnv: process.env,
})
