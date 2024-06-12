'use client'

import { Box, Flex, Heading, Skeleton, Text } from '@radix-ui/themes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Name } from '@/components/name'
import { TokenQuery } from '@/generated/ponder'
import { useMints } from '@/lib/hooks/mints'
import styles from './activity.module.css'

dayjs.extend(relativeTime)

type ActivityProps = {
  token: NonNullable<TokenQuery['token']>
}

export function Activity({ token }: ActivityProps) {
  const { mints } = useMints(token)

  const items = mints?.mints ?? Array<null>(5).fill(null)

  return (
    <Flex direction="column" gap="3">
      <Heading>Activity</Heading>
      <Flex asChild direction="column" gap="3" p="0" m="0">
        <ol className={styles.list}>
          {items.map((mint, i) => (
            <Box key={mint?.id ?? i} asChild p="0">
              <li>
                <Flex align="center" justify="between">
                  <Skeleton loading={!mint}>
                    <Text as="div">
                      <Name address={mint?.minterAddress} />
                      {mint && BigInt(mint.amount) > 1n && ` x${mint.amount}`}
                    </Text>
                  </Skeleton>
                  <Skeleton loading={!mint}>
                    <Text as="div">
                      {(mint
                        ? dayjs(new Date(Number(mint.timestamp) * 1000))
                        : dayjs().subtract(1, 'day')
                      ).fromNow()}
                    </Text>
                  </Skeleton>
                </Flex>
                {mint?.comment && <Text color="gray">{mint.comment}</Text>}
              </li>
            </Box>
          ))}
        </ol>
      </Flex>
    </Flex>
  )
}
