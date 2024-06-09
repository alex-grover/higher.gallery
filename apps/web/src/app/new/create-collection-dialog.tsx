import * as Form from '@radix-ui/react-form'
import { PlusIcon } from '@radix-ui/react-icons'
import {
  Box,
  Button,
  Dialog,
  Flex,
  Spinner,
  Text,
  TextArea,
  TextField,
  VisuallyHidden,
} from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import { FormEvent, useCallback, useState } from 'react'
import { usePublicClient } from 'wagmi'
import { uploadJSON, useUploadFile } from '@/lib/ipfs'
import styles from './create-collection-dialog.module.css'

export function CreateCollectionDialog() {
  const router = useRouter()
  const client = usePublicClient()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const { upload, preview, uri: image, isUploading, error } = useUploadFile()

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

        if (typeof name !== 'string' || typeof description !== 'string') {
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

        router.push(
          `/new?${new URLSearchParams({ contractURI: uri }).toString()}`,
        )
      }

      void handle()
    },
    [client, image, router],
  )

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button size="4">
          <PlusIcon /> New collection
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>New collection</Dialog.Title>

        <Flex asChild direction="column" gap="3">
          <Form.Root onSubmit={handleSubmit}>
            <Form.Field name="image">
              <Form.Label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Image (optional)
                </Text>
              </Form.Label>
              {preview ? (
                <Box asChild height="128px" width="128px">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={preview}
                    alt="Image preview"
                    className={styles.image}
                  />
                </Box>
              ) : (
                <Flex
                  asChild
                  align="center"
                  justify="center"
                  width="128px"
                  height="128px"
                  className={styles.upload}
                >
                  <Form.Label>
                    {isUploading ? <Spinner /> : 'upload ↑'}
                  </Form.Label>
                </Flex>
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

            <Form.Field name="name">
              <Form.Label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Name
                </Text>
              </Form.Label>
              <Form.Control asChild>
                <TextField.Root
                  placeholder="Enter the collection name"
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
                <TextArea placeholder="Enter the collection description" />
              </Form.Control>
            </Form.Field>

            <Flex gap="3" mt="1" justify="end">
              <Dialog.Close>
                <Button variant="soft">Cancel</Button>
              </Dialog.Close>
              <Form.Submit asChild>
                <Button loading={isSubmitting}>Create</Button>
              </Form.Submit>
            </Flex>
          </Form.Root>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}
