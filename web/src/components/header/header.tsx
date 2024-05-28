'use client'

import { ConnectKitButton } from 'connectkit'
import Link from 'next/link'
import { useAccount } from 'wagmi'
import styles from './header.module.css'

export function Header() {
  const { address } = useAccount()

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.brand}>
        <h1 className={styles.heading}>↑</h1>
      </Link>
      <nav className={styles.menu}>
        {address && <Link href="/new" className={styles.create}>create</Link>}
        <ConnectKitButton/>
      </nav>
    </header>
  )
}
