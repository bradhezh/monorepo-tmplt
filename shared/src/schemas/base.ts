import {z, ZodRawShape, ZodType} from 'zod'

import {MESSAGE} from '@shared/const'
import conf from '@shared/conf'

export enum Order {
  Asc = 'asc',
  Desc = 'desc',
}

export const operators = [{
  name: 'startsWith',
  type: 'string',
}, {
  name: 'endsWith',
  type: 'string',
}, {
  name: 'contains',
  type: 'string',
}, {
  name: 'gt',
}, {
  name: 'gte',
}, {
  name: 'lt',
}, {
  name: 'lte',
}]

/** Zod schema for id in the request parameters. */
// `coerce` needed here since params are strings
export const idSchema = z.coerce.number().int()
/** Type of id from the request parameters. */
export type Id = z.infer<typeof idSchema>

/** Zod schema for ids in the request body. */
export const idsSchema = z.number().int().array()
/** Type of ids from the request body. */
export type Ids = z.infer<typeof idsSchema>

/** Zod schema for `related` in the request query string. */
// `coerce` needed here since from the query string
export const relatedSchema = z.coerce.boolean().optional()
/** Type of `related` from the request query string. */
export type Related = z.infer<typeof relatedSchema>

export const pagiSchema = (keys: string[]) => {
  return z.object({
    // `coerce` needed here since maybe from the query string
    page: z.coerce.number().int().min(1).default(1),
    pageSize:
      z.coerce.number().int().min(1).max(conf.PAGE_MAX).default(conf.PAGE_DEF),
    order: z.nativeEnum(Order).default(Order.Asc),
    ...(!keys.length
      ? {} : {orderBy: z.enum(keys as [string, ...string[]]).optional()}),
  })
}

const conditionSchema = <T>(schema: ZodType<T>) => {
  return z.union([schema, z.object(
    Object.fromEntries(operators.map(e => [e.name, schema])))
    .partial().refine(data => {
      if (!Object.values(data).some(e => e))
        return false
      for (const op of operators) {
        if (op.type && op.name in data && typeof data[op.name] !== op.type) {
          return false
        }
      }
      if (data.gt && data.gte || data.lt && data.lte) {
        return false
      }
      const from = data.gt || data.gte
      const to = data.lt || data.lte
      if (from && to && from > to) {
        return false
      }
      return true
    }, {message: MESSAGE.INV_CONDITION})])
}

export const filterSchema = <T extends ZodRawShape>(
  keys: string[], shape: T,
) => {
  return z.object(
    Object.fromEntries(keys.map(e => [e, conditionSchema(shape[e])])))
    .partial()
}

export const listSchema = <T>(schema: ZodType<T>) => {
  return z.tuple([schema.array(), z.number().int().nonnegative()])
}
