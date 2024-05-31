import { createSchema } from '@ponder/core'

export default createSchema((p) => ({
  Higher1155Collection: p.createTable({
    id: p.string(),
    creatorAddress: p.string(),
    name: p.string(),
    description: p.string(),
    image: p.string(),
  }),
  Higher1155Token: p.createTable({
    id: p.string(),
    higher1155CollectionId: p.string().references('Higher1155Collection.id'),
    higher1155Collection: p.one('higher1155CollectionId'),
    timestamp: p.bigint(),
    tokenId: p.bigint(),
    name: p.string(),
    description: p.string(),
    image: p.string(),
    price: p.bigint(),
    maxSupply: p.bigint().optional(),
    endTimestamp: p.bigint().optional(),
    mintCount: p.bigint(),
  }),
  Mint: p.createTable({
    id: p.string(),
    timestamp: p.bigint(),
    higher1155TokenId: p.string().references('Higher1155Token.id'),
    higher1155Token: p.one('higher1155TokenId'),
    minterAddress: p.string(),
    amount: p.bigint(),
    comment: p.string().optional(),
  }),
}))
