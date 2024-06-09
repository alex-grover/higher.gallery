import { Button, Dialog, Flex } from '@radix-ui/themes'
import { ComponentProps, useCallback } from 'react'
import { chain } from '@/env'
import {
  iHigher1155FactoryAddress,
  useWriteErc20Approve,
} from '@/generated/wagmi'
import { UINT256_MAX } from '@/lib/constants'

type ApproveDialogProps = ComponentProps<typeof Dialog.Root> & {
  onSuccess: () => void
}

export function ApproveDialog({
  onSuccess,
  onOpenChange,
  ...props
}: ApproveDialogProps) {
  const { writeContractAsync, isPending } = useWriteErc20Approve()

  const handleApprove = useCallback(() => {
    async function handle() {
      await writeContractAsync({
        args: [iHigher1155FactoryAddress[chain.id], UINT256_MAX],
      })

      alert('Approved $HIGHER')

      onSuccess()
      onOpenChange?.(false)
    }

    void handle()
  }, [writeContractAsync, onSuccess, onOpenChange])

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
          <Button onClick={handleApprove} loading={isPending}>
            Approve
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}
