import { type Address, isAddress } from 'viem'
import { z } from 'zod'

export const address = z.custom<Address>((val) => typeof val === 'string' ? isAddress(val) : false)
