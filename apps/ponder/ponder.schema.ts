import { createSchema } from '@ponder/core'

export default createSchema((p) => ({
  Collection: p.createTable({
    id: p.string(),
    timestamp: p.bigint(),
    creatorAddress: p.string(),
    name: p.string(),
    description: p.string(),
    image: p.string(),
    tokenCount: p.int(),
  }),
  Token: p.createTable({
    id: p.string(),
    collectionId: p.string().references('Collection.id'),
    collection: p.one('collectionId'),
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
    tokenId: p.string().references('Token.id'),
    token: p.one('tokenId'),
    minterAddress: p.string(),
    amount: p.bigint(),
    comment: p.string().optional(),
  }),
}))
