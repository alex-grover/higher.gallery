import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { PropsWithChildren } from 'react'
import { Header } from '@/components/header/Header'
import { Web3Provider } from '@/components/Web3Provider'
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
        <Web3Provider>
          <Header />
          {children}
        </Web3Provider>
      </body>
    </html>
  )
}
