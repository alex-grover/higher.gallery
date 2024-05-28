import { z } from 'zod'

export const bigIntString = z.bigint().pipe(z.coerce.string()).brand('BigIntString')

export type BigIntString = z.output<typeof bigIntString>
