import * as Form from '@radix-ui/react-form'
import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Spinner,
  Text,
  TextArea,
  TextField,
  VisuallyHidden,
} from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import { FormEvent, useCallback, useState } from 'react'
import { mutate } from 'swr'
import useSWRImmutable from 'swr/immutable'
import { Address, parseEther } from 'viem'
import { usePublicClient } from 'wagmi'
import { GetCollectionResponse } from '@/app/api/collections/[address]/route'
import { higher1155Abi, useWriteHigher1155Create } from '@/generated/wagmi'
import { uploadJSON, useUploadFile } from '@/lib/ipfs'
import styles from './create-token-form.module.css'

type CreateTokenFormProps = {
  address: Address
  collectionAddress: Address
}

export function CreateTokenForm({
  address,
  collectionAddress,
}: CreateTokenFormProps) {
  const router = useRouter()
  const client = usePublicClient()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const { data, isLoading } = useSWRImmutable<GetCollectionResponse>(
    `/api/collections/${collectionAddress}`,
    { shouldRetryOnError: false },
  )

  const { upload, preview, uri: image, isUploading, error } = useUploadFile()

  const { writeContractAsync } = useWriteHigher1155Create()

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      async function handle() {
        if (!client) {
          alert('Error getting client')
          return
        }

        const data = new FormData(event.currentTarget)
        const name = data.get('name')
        const description = data.get('description')
        const price = data.get('price')
        const maxSupply = data.get('maxSupply')
        const mintDuration = data.get('mintDuration')

        if (
          typeof name !== 'string' ||
          typeof description !== 'string' ||
          typeof price !== 'string' ||
          typeof maxSupply !== 'string' ||
          typeof mintDuration !== 'string'
        ) {
          alert('Invalid form data')
          return
        }

        setIsSubmitting(true)

        let uri
        try {
          uri = await uploadJSON({
            name,
            description,
            image,
          })
        } catch (e) {
          const error = e as Error
          alert(error.message)
          setIsSubmitting(false)
          return
        }

        const { request, result } = await client.simulateContract({
          account: address,
          address: collectionAddress,
          abi: higher1155Abi,
          functionName: 'create',
          args: [
            uri,
            {
              price: parseEther(price),
              maxSupply: BigInt(maxSupply),
              endTimestamp:
                BigInt(mintDuration) &&
                BigInt(Math.floor(new Date().valueOf() / 1000)) +
                  BigInt(mintDuration) * 24n * 60n * 60n,
            },
          ],
        })

        const hash = await writeContractAsync(request)

        const receipt = await client.waitForTransactionReceipt({
          hash,
          confirmations: 3,
        })
        if (receipt.status === 'reverted') {
          alert('Transaction reverted')
          setIsSubmitting(false)
          return
        }

        await mutate(`/api/tokens`)

        router.push(`/${collectionAddress}/${result.toString()}`)
      }

      void handle()
    },
    [client, image, writeContractAsync, address, collectionAddress, router],
  )

  if (isLoading) return null

  if (!data || data.creatorAddress !== address) {
    router.replace('/new')
    return null
  }

  return (
    <>
      <Heading size="8" weight="bold" mb="4">
        Create
      </Heading>
      <Grid
        asChild
        rows={{ initial: 'auto auto', sm: '1' }}
        columns={{ initial: '1', sm: '2' }}
        gap="4"
      >
        <Form.Root onSubmit={handleSubmit}>
          <Form.Field name="image">
            <Form.Label>
              <Heading as="h2" size="4" mb="1">
                Image
              </Heading>
            </Form.Label>
            {preview ? (
              <Form.Label>
                <Box asChild maxHeight="600px" width="100%">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={preview}
                    alt="Image preview"
                    className={styles.image}
                  />
                </Box>
              </Form.Label>
            ) : (
              <AspectRatio asChild>
                <Flex
                  asChild
                  align="center"
                  justify="center"
                  width="100%"
                  className={styles.upload}
                >
                  <Form.Label>
                    {isUploading ? <Spinner /> : 'upload ↑'}
                  </Form.Label>
                </Flex>
              </AspectRatio>
            )}
            <VisuallyHidden>
              <Form.Control asChild>
                <input type="file" onChange={upload} />
              </Form.Control>
            </VisuallyHidden>
            {error && (
              <Text as="div" size="2" mt="1" color="red">
                {error}
              </Text>
            )}
          </Form.Field>

          <Flex direction="column" gap="6">
            <Flex direction="column" gap="3">
              <Heading as="h2" size="4">
                Details
              </Heading>

              <Form.Field name="name">
                <Form.Label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Name
                  </Text>
                </Form.Label>
                <Form.Control asChild>
                  <TextField.Root
                    placeholder="Enter the edition name"
                    required
                  />
                </Form.Control>
                <Form.Message asChild match="valueMissing">
                  <Text as="div" size="2" mt="1" color="red">
                    Please enter a name
                  </Text>
                </Form.Message>
              </Form.Field>

              <Form.Field name="description">
                <Form.Label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Description (optional)
                  </Text>
                </Form.Label>
                <Form.Control asChild>
                  <TextArea placeholder="Enter the edition description" />
                </Form.Control>
              </Form.Field>
            </Flex>

            <Flex direction="column" gap="3">
              <Heading as="h2" size="4">
                Mint settings
              </Heading>

              <Form.Field name="price">
                <Form.Label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Price (in $HIGHER)
                  </Text>
                </Form.Label>
                <Form.Control asChild>
                  <TextField.Root placeholder="111" required />
                </Form.Control>
                <Form.Message asChild match="valueMissing">
                  <Text as="div" size="2" mt="1" color="red">
                    Please enter a price
                  </Text>
                </Form.Message>
              </Form.Field>

              <Form.Field name="maxSupply">
                <Form.Label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Edition size
                  </Text>
                </Form.Label>
                <Form.Control asChild>
                  <TextField.Root placeholder="Leave empty for unlimited" />
                </Form.Control>
              </Form.Field>

              <Form.Field name="mintDuration">
                <Form.Label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Mint duration (in days)
                  </Text>
                </Form.Label>
                <Form.Control asChild>
                  <TextField.Root placeholder="Leave empty for untimed" />
                </Form.Control>
              </Form.Field>
            </Flex>

            <Form.Submit asChild>
              <Button loading={isSubmitting}>Create</Button>
            </Form.Submit>
          </Flex>
        </Form.Root>
      </Grid>
    </>
  )
}
