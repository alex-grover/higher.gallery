import * as Form from '@radix-ui/react-form'
import { Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes'
import { ComponentProps, FormEvent, useCallback, useState } from 'react'
import { toast } from 'sonner'
import {
  formatEther,
  parseEther,
  parseSignature,
  SignTypedDataErrorType,
} from 'viem'
import { useAccount, useBlock, useSignTypedData } from 'wagmi'
import { ApproveParams } from '@/app/(token)/[address]/[id]/mint-section'
import { chain } from '@/env'
import {
  erc20PermitAddress,
  iHigher1155FactoryAddress,
  useReadErc20PermitNonces,
} from '@/generated/wagmi'
import { UINT256_MAX } from '@/lib/constants'

const FIVE_MINUTES_IN_SECONDS = 5n * 60n

type ApproveDialogProps = ComponentProps<typeof Dialog.Root> & {
  minimum: bigint
  onSuccess: (approveParams: ApproveParams) => void
}

type State =
  | {
      mode: 'minimum' | 'unlimited'
    }
  | {
      mode: 'custom'
      value: bigint | null
    }

export function ApproveDialog({
  minimum,
  onSuccess,
  onOpenChange,
  ...props
}: ApproveDialogProps) {
  const account = useAccount()
  const { signTypedDataAsync, isPending } = useSignTypedData()
  const [state, setState] = useState<State>({ mode: 'unlimited' })
  const [error, setError] = useState('')

  const { data: nonce } = useReadErc20PermitNonces({
    chainId: chain.id,
    args: [account.address ?? '0x'],
    query: {
      enabled: account.status === 'connected',
    },
  })

  const { data: block } = useBlock({
    chainId: chain.id,
    watch: true,
  })

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setState({ mode: 'unlimited' })
      onOpenChange?.(open)
    },
    [onOpenChange],
  )

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      async function handle() {
        if (account.status !== 'connected') {
          toast.error('Error getting connected account')
          return
        }

        if (nonce === undefined) {
          toast.error('Error getting nonce')
          return
        }

        if (!block) {
          toast.error('Error getting current block')
          return
        }

        const value = getValue(state, minimum)
        if (!value) {
          setError('Please enter an amount')
          return
        }
        if (value < minimum) {
          setError(
            `Please enter at least the mint cost, ${formatEther(minimum)} $HIGHER`,
          )
          return
        }

        const deadline = block.timestamp + FIVE_MINUTES_IN_SECONDS

        setError('')

        let signature
        try {
          signature = await signTypedDataAsync({
            domain: {
              name: 'higher',
              version: '1',
              chainId: chain.id,
              verifyingContract: erc20PermitAddress[chain.id],
            },
            types: {
              Permit: [
                {
                  name: 'owner',
                  type: 'address',
                },
                {
                  name: 'spender',
                  type: 'address',
                },
                {
                  name: 'value',
                  type: 'uint256',
                },
                {
                  name: 'nonce',
                  type: 'uint256',
                },
                {
                  name: 'deadline',
                  type: 'uint256',
                },
              ],
            },
            primaryType: 'Permit',
            message: {
              owner: account.address,
              spender: iHigher1155FactoryAddress[chain.id],
              value,
              nonce,
              deadline,
            },
          })
        } catch (e) {
          const error = e as SignTypedDataErrorType
          if (
            error.name === 'InternalRpcError' &&
            error.details.includes('User rejected the request')
          ) {
            toast.info('Signature rejected')
          } else {
            toast.error(error.message)
          }

          return
        }

        const parsedSignature = parseSignature(signature)

        onSuccess({
          ...parsedSignature,
          value,
          deadline,
        })
        onOpenChange?.(false)
      }

      void handle()
    },
    [
      signTypedDataAsync,
      account,
      nonce,
      block,
      state,
      minimum,
      onSuccess,
      onOpenChange,
    ],
  )

  return (
    <Dialog.Root onOpenChange={handleOpenChange} {...props}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Approve $HIGHER</Dialog.Title>

        <Dialog.Description mb="3">
          Enable minting with $HIGHER. You will only need to do this when your
          approval runs out.
        </Dialog.Description>

        <Text as="div" size="2" mb="1" weight="bold">
          Amount
        </Text>
        <Flex gap="3" justify="between">
          <Button
            variant={state.mode === 'minimum' ? 'solid' : 'soft'}
            onClick={() => {
              setState({ mode: 'minimum' })
              setError('')
            }}
          >
            Minimum
          </Button>
          <Button
            variant={state.mode === 'unlimited' ? 'solid' : 'soft'}
            onClick={() => {
              setState({ mode: 'unlimited' })
              setError('')
            }}
          >
            Unlimited
          </Button>
          <Button
            variant={state.mode === 'custom' ? 'solid' : 'soft'}
            onClick={() => {
              setState({ mode: 'custom', value: minimum })
            }}
          >
            Custom
          </Button>
        </Flex>

        <Form.Root onSubmit={handleSubmit}>
          {state.mode === 'custom' && (
            <>
              <TextField.Root
                placeholder={`Enter at least ${formatEther(minimum)}`}
                value={state.value !== null ? formatEther(state.value) : ''}
                onChange={(e) => {
                  const value = e.target.value.split('.')[0]
                  setError('')

                  if (value === '') {
                    setState({ mode: 'custom', value: null })
                    return
                  }

                  try {
                    setState({ mode: 'custom', value: parseEther(value) })
                  } catch {
                    // Don't update if input is invalid
                  }
                }}
                type="number"
                inputMode="numeric"
                autoFocus
                mt="3"
              />
              {error && (
                <Text as="div" size="2" mt="1" color="red">
                  {error}
                </Text>
              )}
            </>
          )}

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft">Cancel</Button>
            </Dialog.Close>
            <Button
              loading={isPending}
              disabled={nonce === undefined || !block}
            >
              Approve
            </Button>
          </Flex>
        </Form.Root>
      </Dialog.Content>
    </Dialog.Root>
  )
}

function getValue(state: State, minimum: bigint) {
  switch (state.mode) {
    case 'minimum':
      return minimum
    case 'unlimited':
      return UINT256_MAX
    case 'custom':
      return state.value
  }
}
