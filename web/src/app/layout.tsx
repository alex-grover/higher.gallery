import { type Metadata } from 'next'
import { Inter } from 'next/font/google'
import { type PropsWithChildren } from 'react'
import { Header } from '@/components/header'
import { ConnectkitProvider } from '@/components/providers/connectkit'
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
        <ConnectkitProvider>
          <Header />
          {children}
        </ConnectkitProvider>
      </body>
    </html>
  )
}
