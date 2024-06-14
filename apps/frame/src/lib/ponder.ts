import { GraphQLClient } from 'graphql-request'
import { env } from '@/env'
import { getSdk } from '@/generated/ponder'

const graphqlClient = new GraphQLClient(env.PONDER_URL, { fetch })

export const ponderClient = getSdk(graphqlClient)
