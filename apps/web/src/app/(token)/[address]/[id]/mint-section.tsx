'use client'

import * as Form from '@radix-ui/react-form'
import { Box, Button, Flex, Text, TextField } from '@radix-ui/themes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useAccount, usePublicClient } from 'wagmi'
import { ApproveDialog } from '@/app/(token)/[address]/[id]/approve-dialog'
import { chain } from '@/env'
import { TokenQuery } from '@/generated/ponder'
import {
  iHigher1155FactoryAddress,
  useReadErc20Allowance,
  useReadErc20BalanceOf,
  useWriteHigher1155Mint,
} from '@/generated/wagmi'
import { useMints } from '@/lib/hooks/mints'
import { address as addressSchema } from '@/lib/zod/address'

dayjs.extend(relativeTime)

type MintButtonProps = {
  token: NonNullable<TokenQuery['token']>
}

export function MintSection({ token }: MintButtonProps) {
  const client = usePublicClient()
  const account = useAccount()

  const [amount, setAmount] = useState<bigint | ''>(1n)
  const [comment, setComment] = useState('')
  const [approveDialogOpen, setApproveDialogOpen] = useState(false)

  const handleAmountChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      try {
        if (event.target.value === '') setAmount('')
        else setAmount(BigInt(event.target.value))
      } catch {
        // Do nothing if value is invalid
      }
    },
    [],
  )

  const handleCommentChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setComment(event.target.value)
    },
    [],
  )

  const mintEndTime = useMemo(
    () => token.endTimestamp && new Date(Number(token.endTimestamp) * 1000),
    [token.endTimestamp],
  )
  const [mintEnded, setMintEnded] = useState(
    !!mintEndTime && mintEndTime < new Date(),
  )
  const [timeRemaining, setTimeRemaining] = useState(
    mintEndTime && !mintEnded && dayjs(mintEndTime).fromNow(true),
  )

  useEffect(() => {
    if (!mintEndTime) return

    const interval = setInterval(() => {
      setTimeRemaining(!mintEnded && dayjs(mintEndTime).fromNow(true))
      setMintEnded(mintEndTime < new Date())
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [mintEndTime, mintEnded])

  const mints = useMints(token)

  const { data: balance } = useReadErc20BalanceOf({
    args: [account.address ?? '0x'],
    query: {
      enabled: account.status === 'connected',
    },
  })
  const { data: allowance } = useReadErc20Allowance({
    args: [account.address ?? '0x', iHigher1155FactoryAddress[chain.id]],
    query: {
      enabled: account.status === 'connected',
    },
  })

  const { writeContractAsync, isPending } = useWriteHigher1155Mint()

  const mint = useCallback(() => {
    async function execute() {
      if (!client) {
        alert('Error getting client')
        return
      }

      await writeContractAsync({
        address: addressSchema.parse(token.collection.id),
        args: [BigInt(token.tokenId), BigInt(amount), comment],
      })

      alert('Minted!')
    }

    void execute()
  }, [client, writeContractAsync, token, amount, comment])

  const hasSufficientApproval = useMemo(() => {
    if (allowance === undefined || amount === '') return
    return allowance >= BigInt(token.price) * amount
  }, [allowance, amount, token.price])

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (hasSufficientApproval === undefined) {
        alert('Unable to check token approval')
        return
      }

      if (!hasSufficientApproval) {
        setApproveDialogOpen(true)
        return
      }

      mint()
    },
    [hasSufficientApproval, mint],
  )

  return (
    <Flex direction="column" gap="3">
      <Flex asChild direction="column" gap="3">
        <Form.Root onSubmit={handleSubmit}>
          <Form.Field name="amount">
            <Text as="div" size="2" mb="1" weight="bold">
              Amount
            </Text>
            <Form.Control asChild>
              <TextField.Root
                type="number"
                inputMode="numeric"
                placeholder="Number of editions to mint"
                value={amount.toString()}
                onChange={handleAmountChange}
                min="1"
                required
              />
            </Form.Control>
            <Form.Message asChild match="valueMissing">
              <Text as="div" size="2" mt="1" color="red">
                Please enter an amount
              </Text>
            </Form.Message>
            <Form.Message asChild match="rangeUnderflow">
              <Text as="div" size="2" mt="1" color="red">
                Invalid amount
              </Text>
            </Form.Message>
          </Form.Field>

          <Form.Field name="comment">
            <Form.Control asChild>
              <TextField.Root
                placeholder="Add a comment"
                value={comment}
                onChange={handleCommentChange}
              />
            </Form.Control>
          </Form.Field>

          <Box asChild width="100%">
            <Form.Submit asChild>
              <Button
                size="3"
                loading={isPending}
                disabled={
                  account.status !== 'connected' ||
                  balance === undefined ||
                  balance < BigInt(token.price) ||
                  (!!token.maxSupply &&
                    (!mints ||
                      BigInt(mints.count) >= BigInt(token.maxSupply))) ||
                  mintEnded
                }
              >
                {account.status !== 'connected' ||
                hasSufficientApproval === undefined ||
                hasSufficientApproval
                  ? 'Mint'
                  : 'Approve and mint'}
              </Button>
            </Form.Submit>
          </Box>
        </Form.Root>
      </Flex>

      <Text align="center" color="gray" size="1">
        {(!!timeRemaining || mintEnded) && (
          <>
            {timeRemaining && <Text>{timeRemaining} remaining</Text>}
            {mintEnded && <Text>Mint ended</Text>}
            <Text> &bull; </Text>
          </>
        )}
        <Text>
          {mints?.count}
          {token.maxSupply && !mintEnded && ` / ${token.maxSupply}`} minted
        </Text>
      </Text>

      <ApproveDialog
        open={approveDialogOpen}
        onOpenChange={setApproveDialogOpen}
        onSuccess={mint}
      />
    </Flex>
  )
}
