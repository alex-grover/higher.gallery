import { ponder } from '@/generated'
import { env } from './lib/env'

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

    await db.Higher1155Collection.create({
      id: event.args.higher1155,
      data: {
        creatorAddress: event.args.creator,
        name,
        description,
        image,
      },
    })
  },
)

ponder.on('Higher1155:Create', async ({ context, event }) => {
  const { client, contracts, db } = context

  const [uri, mintConfig] = await client.multicall({
    contracts: [
      {
        address: event.log.address,
        abi: contracts.Higher1155.abi,
        functionName: 'uri',
        args: [event.args.id],
      },
      {
        address: event.log.address,
        abi: contracts.Higher1155.abi,
        functionName: 'mintConfig',
        args: [event.args.id],
      },
    ],
    allowFailure: false,
  })

  const response = await fetch(
    uri.replace('ipfs://', env.IPFS_GATEWAY_BASE_URL),
  )
  const { name, description, image } = (await response.json()) as Metadata

  await db.Higher1155Token.create({
    id: `${event.log.address}-${event.args.id.toString()}`,
    data: {
      higher1155CollectionId: event.log.address,
      tokenId: event.args.id,
      name,
      description,
      image,
      price: mintConfig.price,
      maxSupply: mintConfig.maxSupply || undefined,
      endTimestamp: mintConfig.endTimestamp || undefined,
      mintCount: 0n,
    },
  })
})

ponder.on('Higher1155:Mint', async ({ context, event }) => {
  const { db } = context

  const higher1155TokenId = `${event.log.address}-${event.args.id.toString()}`

  await Promise.all([
    db.Mint.create({
      id: `${event.block.number.toString()}-${event.transaction.transactionIndex.toString()}-${event.log.logIndex.toString()}`,
      data: {
        higher1155TokenId,
        minterAddress: event.args.minter,
        amount: event.args.amount,
        comment: event.args.comment || undefined,
      },
    }),
    db.Higher1155Token.update({
      id: higher1155TokenId,
      data: ({ current }) => ({
        mintCount: current.mintCount + event.args.amount,
      }),
    }),
  ])
})
