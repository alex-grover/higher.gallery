'use client'

import { Box, Flex, Text } from '@radix-ui/themes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Name } from '@/components/name'
import { TokenQuery } from '@/generated/ponder'
import { useMints } from '@/lib/hooks/mints'
import styles from './activity.module.css'

// eslint-disable-next-line import/no-named-as-default-member
dayjs.extend(relativeTime)

type ActivityProps = {
  token: NonNullable<TokenQuery['token']>
}

export function Activity({ token }: ActivityProps) {
  const mints = useMints(token)

  return (
    <Flex asChild direction="column" gap="3" p="0">
      <ol className={styles.list}>
        {mints?.mints.map((mint) => (
          <Box key={mint.id} asChild p="0">
            <li>
              <Flex align="center" justify="between">
                <Text as="div">
                  <Name address={mint.minterAddress} />
                  {BigInt(mint.amount) > 1n && ` x${mint.amount}`}
                </Text>
                <Text as="div">
                  {dayjs(new Date(Number(mint.timestamp) * 1000)).fromNow()}
                </Text>
              </Flex>
              {mint.comment && <Text color="gray">{mint.comment}</Text>}
            </li>
          </Box>
        ))}
      </ol>
    </Flex>
  )
}
