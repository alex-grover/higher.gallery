import {
  Box,
  Container,
  Flex,
  Heading,
  Reset,
  Skeleton,
  Table,
  Text,
} from '@radix-ui/themes'
import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'
import { Address } from 'viem'
import { ListUserCollectionsResponse } from '@/app/api/users/[address]/collections/route'
import { formatIpfsUri } from '@/lib/utils/ipfs'
import styles from './collection-step.module.css'
import { CreateCollectionDialog } from './create-collection-dialog'

type CollectionStepProps = {
  address: Address
}

export function CollectionStep({ address }: CollectionStepProps) {
  const { data } = useSWR<ListUserCollectionsResponse>(
    `/api/users/${address}/collections`,
  )

  return (
    <Container size="2">
      <Flex direction="column" gap="4">
        <Heading size="8" weight="bold">
          Select a collection
        </Heading>
        <CreateCollectionDialog />
        {data ? (
          data.length > 0 && (
            <Table.Root variant="surface">
              <Table.Body>
                {data.map((collection) => (
                  <Table.Row key={collection.id} className={styles.row}>
                    <Table.RowHeaderCell>
                      <Flex asChild align="center" gap="4">
                        <Reset>
                          <Link
                            href={`/new?${new URLSearchParams({ collectionAddress: collection.id }).toString()}`}
                          >
                            <Box
                              position="relative"
                              width="48px"
                              height="48px"
                              overflow="hidden"
                            >
                              <Image
                                src={formatIpfsUri(collection.image)}
                                alt="Collection image"
                                className={styles.image}
                                fill
                                sizes="48px"
                              />
                            </Box>
                            <Text size="4" weight="medium">
                              {collection.name}
                            </Text>
                          </Link>
                        </Reset>
                      </Flex>
                    </Table.RowHeaderCell>
                    <Flex asChild align="stretch" height="100%">
                      <Table.Cell>
                        <Flex asChild align="center" width="100%">
                          <Reset>
                            <Link
                              href={`/new?${new URLSearchParams({ collectionAddress: collection.id }).toString()}`}
                            >
                              {collection.tokenCount.toString()} token
                              {collection.tokenCount !== 1 && 's'}
                            </Link>
                          </Reset>
                        </Flex>
                      </Table.Cell>
                    </Flex>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          )
        ) : (
          <Box>
            <Box py="3">
              <Skeleton height="48px" className={styles.skeleton} />
            </Box>
            <Box py="3">
              <Skeleton height="48px" className={styles.skeleton} />
            </Box>
            <Box py="3">
              <Skeleton height="48px" className={styles.skeleton} />
            </Box>
          </Box>
        )}
      </Flex>
    </Container>
  )
}
