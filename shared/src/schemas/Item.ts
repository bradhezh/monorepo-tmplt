import {z} from 'zod'

import {pagiSchema, filterSchema, listSchema} from '@shared/schemas/base'
import {userSchemaRes} from '@shared/schemas'
import {itemSchema} from '@shared/schemas/prisma'

const autos = ['id', 'created_at', 'updated_at'] as const
export const itemExcludes = [] as const
export const itemRelations = () => {return {user: userSchemaRes.nullish()}}

const filterKeys = Object.keys(itemSchema.shape).filter(
  (e) => !itemExcludes.includes(e as typeof itemExcludes[number]))

/** Requests for creation */
export const itemSchemaData = itemSchema.omit(Object.fromEntries(
  autos.map((e) => [e, true])) as {[E in typeof autos[number]]: true})
export type ItemData = z.infer<typeof itemSchemaData>

/** Requests for update */
export const itemSchemaDataOpt = itemSchemaData.partial().omit(
  Object.fromEntries(itemExcludes.map((e) => [e, true])) as {
    [E in typeof itemExcludes[number]]: true
  })
export type ItemDataOpt = z.infer<typeof itemSchemaDataOpt>

/** Response with one item (default) */
export const itemSchemaRes = itemSchema.omit(Object.fromEntries(
  itemExcludes.map((e) => [e, true])) as {
    [E in typeof itemExcludes[number]]: true
  })
export type ItemRes = z.infer<typeof itemSchemaRes>

/** Response with one item (related) */
export const itemSchemaResRelated =
  z.lazy(() => itemSchemaRes.extend(itemRelations()))
export type ItemResRelated = z.infer<typeof itemSchemaResRelated>

/** Response with items (default) */
export const itemSchemaResList = listSchema(itemSchemaRes)
export type ItemResList = z.infer<typeof itemSchemaResList>

/** Response with items (related) */
export const itemSchemaResListRelated = listSchema(itemSchemaResRelated)
export type ItemResListRelated = z.infer<typeof itemSchemaResListRelated>

/** Requests with pagination */
export const itemSchemaPagi = pagiSchema(filterKeys)
export type ItemPagi = z.infer<typeof itemSchemaPagi>

/** Requests for search */
export const itemSchemaFilter =
  filterSchema(filterKeys, itemSchema.shape).merge(itemSchemaPagi)
export type ItemFilter = z.infer<typeof itemSchemaFilter>
