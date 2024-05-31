import { Analytics } from '@vercel/analytics/react'
import { type Metadata } from 'next'
import { Inter } from 'next/font/google'
import { type PropsWithChildren } from 'react'
import { Header } from '@/components/header'
import { ConnectkitProvider } from '@/components/providers/connectkit'
import { SWRProvider } from '@/components/providers/swr'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'higher.gallery',
  description: 'higher.gallery',
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SWRProvider>
          <ConnectkitProvider>
            <Header />
            {children}
          </ConnectkitProvider>
        </SWRProvider>
        <Analytics />
      </body>
    </html>
  )
}
