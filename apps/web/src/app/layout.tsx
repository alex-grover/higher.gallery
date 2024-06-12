import { Theme } from '@radix-ui/themes'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { type Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { type PropsWithChildren } from 'react'
import { Toaster } from 'sonner'
import { Header } from '@/components/header'
import { ConnectkitProvider } from '@/components/providers/connectkit'
import { SWRProvider } from '@/components/providers/swr'
import './globals.css'

export const metadata: Metadata = {
  title: 'higher.gallery',
  description: 'higher.gallery',
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class">
          <Theme accentColor="gray" grayColor="slate">
            <SWRProvider>
              <ConnectkitProvider>
                <Header />
                {children}
                <Toaster theme="system" />
              </ConnectkitProvider>
            </SWRProvider>
            <Analytics />
            <SpeedInsights />
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  )
}
