import { address as addressSchema } from '@/lib/zod/address'
import { z } from 'zod'

export const tokenSchema = z.object({
  address: addressSchema,
  id: z.string().pipe(z.coerce.bigint().positive())
})
