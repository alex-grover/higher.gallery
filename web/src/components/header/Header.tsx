'use client'

import { ConnectKitButton } from 'connectkit'
import styles from './header.module.css'

export function Header() {
  return (
    <header className={styles.header}>
      <h1>higher.gallery</h1>
      <ConnectKitButton/>
    </header>
  )
}
