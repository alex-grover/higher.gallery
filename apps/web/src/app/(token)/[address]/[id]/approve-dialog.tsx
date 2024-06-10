import { Button, Dialog, Flex } from '@radix-ui/themes'
import { ComponentProps, useCallback } from 'react'
import { parseSignature } from 'viem'
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
  onSuccess: (approveParams: ApproveParams) => void
}

export function ApproveDialog({
  onSuccess,
  onOpenChange,
  ...props
}: ApproveDialogProps) {
  const account = useAccount()
  const { signTypedDataAsync, isPending } = useSignTypedData()

  const { data: nonce } = useReadErc20PermitNonces({
    args: [account.address ?? '0x'],
    query: {
      enabled: account.status === 'connected',
    },
  })

  const { data: block } = useBlock({ watch: true })

  const handleApprove = useCallback(() => {
    async function handle() {
      if (account.status !== 'connected') {
        alert('Error getting connected account')
        return
      }

      if (nonce === undefined) {
        alert('Error getting nonce')
        return
      }

      if (!block) {
        alert('Error getting current block')
        return
      }

      const deadline = block.timestamp + FIVE_MINUTES_IN_SECONDS

      const signature = await signTypedDataAsync({
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
          value: UINT256_MAX,
          nonce,
          deadline,
        },
      })

      const parsedSignature = parseSignature(signature)

      onSuccess({
        ...parsedSignature,
        deadline,
      })
      onOpenChange?.(false)
    }

    void handle()
  }, [signTypedDataAsync, account, nonce, block, onSuccess, onOpenChange])

  return (
    <Dialog.Root onOpenChange={onOpenChange} {...props}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Approve $HIGHER</Dialog.Title>

        <Dialog.Description mb="3">
          Enable minting with $HIGHER. You will only need to do this once.
        </Dialog.Description>

        <Flex gap="3" mt="1" justify="end">
          <Dialog.Close>
            <Button variant="soft">Cancel</Button>
          </Dialog.Close>
          <Button
            onClick={handleApprove}
            loading={isPending}
            disabled={nonce === undefined || !block}
          >
            Approve
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}
