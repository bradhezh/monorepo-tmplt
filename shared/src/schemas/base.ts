import {z, ZodType} from 'zod'

import {MESSAGE} from '@shared/const'
import conf from '@shared/conf'

export enum Order {
  Asc = 'asc',
  Desc = 'desc',
}

/** Requests for deletion */
export const idsSchema = z.array(z.number().int().positive())
export type Ids = z.infer<typeof idsSchema>

export const createdAtSchema = z.object({
  createdAtMin: z.coerce.date().optional(),
  createdAtMax: z.coerce.date().optional(),
}).refine((data) => {
  if (!data.createdAtMin || !data.createdAtMax) {
    return true
  }
  return data.createdAtMin <= data.createdAtMax
}, {
  message: MESSAGE.INV_CREATEDAT,
  path: ['createdAtMin'],
})

export const pagiSchema = <E extends Record<string, string>>(
  PropFilterEnum: E,
) => {
  return z.object({
    orderBy: z.nativeEnum(PropFilterEnum).optional(),
    order: z.nativeEnum(Order).default(Order.Asc),
    page: z.number().int().min(1).default(1),
    pageSize: z.number().int().min(1).max(conf.PAGE_MAX).default(conf.PAGE_DEF),
  })
}

export const listSchema = <T>(schema: ZodType<T>) => {
  return z.object({
    list: z.array(schema),
    total: z.number().int().nonnegative(),
  })
}
