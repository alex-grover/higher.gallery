import { ponder } from '@/generated'
import { env } from '@/lib/env'

type Metadata = {
  name: string
  description: string
  image: string
}

ponder.on(
  'IHigher1155Factory:Higher1155Deployed',
  async ({ context, event }) => {
    const { client, contracts, db } = context

    const contractURI = await client.readContract({
      address: event.args.higher1155,
      abi: contracts.Higher1155.abi,
      functionName: 'contractURI',
    })

    const response = await fetch(
      contractURI.replace('ipfs://', env.IPFS_GATEWAY_BASE_URL),
    )
    const { name, description, image } = (await response.json()) as Metadata

    await db.Collection.create({
      id: event.args.higher1155,
      data: {
        timestamp: event.block.timestamp,
        creatorAddress: event.args.creator,
        name,
        description,
        image,
        tokenCount: 0,
      },
    })
  },
)

ponder.on('Higher1155:Create', async ({ context, event }) => {
  const { client, contracts, db } = context

  const [uri, mintConfig] = await Promise.all([
    client.readContract({
      address: event.log.address,
      abi: contracts.Higher1155.abi,
      functionName: 'uri',
      args: [event.args.id],
    }),
    client.readContract({
      address: event.log.address,
      abi: contracts.Higher1155.abi,
      functionName: 'mintConfig',
      args: [event.args.id],
    }),
  ])

  const response = await fetch(
    uri.replace('ipfs://', env.IPFS_GATEWAY_BASE_URL),
  )
  const { name, description, image } = (await response.json()) as Metadata

  await Promise.all([
    db.Token.create({
      id: `${event.log.address}-${event.args.id.toString()}`,
      data: {
        collectionId: event.log.address,
        tokenId: event.args.id,
        timestamp: event.block.timestamp,
        name,
        description,
        image,
        price: mintConfig.price,
        maxSupply: mintConfig.maxSupply || undefined,
        endTimestamp: mintConfig.endTimestamp || undefined,
        mintCount: 0n,
      },
    }),
    db.Collection.update({
      id: event.log.address,
      data: ({ current }) => ({
        tokenCount: current.tokenCount + 1,
      }),
    }),
  ])
})

ponder.on('Higher1155:Mint', async ({ context, event }) => {
  const { db } = context

  const tokenId = `${event.log.address}-${event.args.id.toString()}`

  await Promise.all([
    db.Mint.create({
      id: `${event.block.number.toString()}-${event.transaction.transactionIndex.toString()}-${event.log.logIndex.toString()}`,
      data: {
        tokenId,
        timestamp: event.block.timestamp,
        minterAddress: event.args.minter,
        amount: event.args.amount,
        comment: event.args.comment || undefined,
      },
    }),
    db.Token.update({
      id: tokenId,
      data: ({ current }) => ({
        mintCount: current.mintCount + event.args.amount,
      }),
    }),
  ])
})
