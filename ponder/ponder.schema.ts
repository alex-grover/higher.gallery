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
    higher1155CollectionId: p.string(),
    tokenId: p.bigint(),
    name: p.string(),
    description: p.string(),
    image: p.string(),
    price: p.bigint(),
    maxSupply: p.bigint(),
    endTimestamp: p.bigint(),
    mintCount: p.bigint(),
  }),
  Mint: p.createTable({
    id: p.string(),
    higher1155TokenId: p.string(),
    minterAddress: p.string(),
    amount: p.bigint(),
    comment: p.string(),
  }),
}))
