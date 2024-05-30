'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConnectKitProvider, getDefaultConfig } from 'connectkit'
import { type PropsWithChildren } from 'react'
import { WagmiProvider, createConfig } from 'wagmi'
import { chain, env } from '@/env'

const config = createConfig(
  getDefaultConfig({
    chains: [chain],
    walletConnectProjectId: env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    appName: 'higher.gallery',
    appDescription: 'higher.gallery',
    appUrl: 'https://higher.gallery',
    appIcon: 'https://higher.gallery/logo.png',
  }),
)

const queryClient = new QueryClient()

export function ConnectkitProvider({ children }: PropsWithChildren) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
