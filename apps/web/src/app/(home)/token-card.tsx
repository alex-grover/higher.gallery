import { Box, Flex, Text } from '@radix-ui/themes'
import { type RenderComponentProps } from 'masonic'
import Link from 'next/link'
import { ListTokensResponse } from '@/app/api/tokens/route'
import { Name } from '@/components/name'
import { formatIpfsUri } from '@/lib/utils/ipfs'
import styles from './token-card.module.css'

type TokenProps = RenderComponentProps<ListTokensResponse['tokens'][number]>

export function TokenCard({ data: token }: TokenProps) {
  return (
    <Box asChild display="block" position="relative" overflow="hidden">
      <Link
        href={`/${token.collection.id}/${token.tokenId.toString()}`}
        className={styles.link}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={
            token.image.startsWith('ipfs://')
              ? formatIpfsUri(token.image)
              : token.image
          }
          alt="Token image"
          loading="lazy"
          className={styles.image}
        />
        <Flex
          position="absolute"
          inset="0"
          direction="column"
          justify="end"
          p="4"
          className={styles.overlay}
        >
          <Text size="2" weight="medium" className={styles.name}>
            {token.name}
          </Text>
          <Text size="1" className={styles.artist}>
            <Name address={token.collection.creatorAddress} />
          </Text>
        </Flex>
      </Link>
    </Box>
  )
}
