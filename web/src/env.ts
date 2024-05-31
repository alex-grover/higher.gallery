import { createEnv } from '@t3-oss/env-nextjs'
import { baseSepolia } from 'viem/chains'
import { base } from 'wagmi/chains'
import { z } from 'zod'

export const env = createEnv({
  client: {
    NEXT_PUBLIC_VERCEL_ENV: z.enum(['production', 'preview', 'development']),
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: z.string().min(1),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_VERCEL_ENV: process.env.NEXT_PUBLIC_VERCEL_ENV,
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID:
      process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  },
})

export const chain =
  env.NEXT_PUBLIC_VERCEL_ENV === 'production' ? base : baseSepolia
