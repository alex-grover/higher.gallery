'use client'

import { Button, Flex } from '@radix-ui/themes'
import { ConnectKitButton } from 'connectkit'
import Image from 'next/image'
import Link from 'next/link'
import { useAccount } from 'wagmi'
import { Container } from '@/components/container'
import styles from './header.module.css'

export function Header() {
  const { status } = useAccount()

  return (
    <Container asChild>
      <header>
        <Flex align="center" justify="between" py="2" width="100%">
          <Flex asChild align="center">
            <Link href="/" className={styles.link}>
              <Image
                src="https://pink-worldwide-orangutan-81.mypinata.cloud/ipfs/QmQ6w1rWT1mZfyLp8hPYuV3XbsXniborhN9P48ZripDn7d"
                alt="Higher logo"
                width={128}
                height={128}
                className={styles.brand}
              />
            </Link>
          </Flex>
          <Flex asChild align="center" gap="5">
            <nav>
              {status === 'connected' && (
                <Button asChild variant="ghost" size="3">
                  <Link href="/new">create</Link>
                </Button>
              )}
              <ConnectKitButton showAvatar={false} />
            </nav>
          </Flex>
        </Flex>
      </header>
    </Container>
  )
}
