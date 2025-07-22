import {z} from 'zod'

import {pagiSchema, filterSchema, listSchema} from '@shared/schemas/base'
import {userSchemaRes} from '@shared/schemas'
import {itemSchema} from '@shared/schemas/prisma'

const autos = ['id', 'created_at', 'updated_at'] as const
export const itemExcludes = [] as const
export const itemOrderBy = 'name' as const
export const itemRelations = () => {return {user: userSchemaRes.nullish()}}

const filterKeys = Object.keys(itemSchema.shape).filter(
  e => !itemExcludes.includes(e as typeof itemExcludes[number]))

/** Zod schema for the creation request body. */
export const itemSchemaData = itemSchema.omit(Object.fromEntries(
  autos.map(e => [e, true])) as {[E in typeof autos[number]]: true})
/** Type of the creation request body. */
export type ItemData = z.infer<typeof itemSchemaData>

/** Zod schema for the updating request body. */
export const itemSchemaDataOpt = itemSchemaData.partial().omit(
  Object.fromEntries(itemExcludes.map(e => [e, true])) as {
    [E in typeof itemExcludes[number]]: true
  })
/** Type of the updating request body. */
export type ItemDataOpt = z.infer<typeof itemSchemaDataOpt>

/** Zod schema for the response with one item (without relations). */
export const itemSchemaRes = itemSchema.omit(Object.fromEntries(
  itemExcludes.map(e => [e, true])) as {
    [E in typeof itemExcludes[number]]: true
  })
/** Type of the response with one item (without relations). */
export type ItemRes = z.infer<typeof itemSchemaRes>

/** Zod schema for the response with one item (with relations). */
export const itemSchemaResRelated =
  z.lazy(() => itemSchemaRes.extend(itemRelations()))
/** Type of the response with one item (with relations). */
export type ItemResRelated = z.infer<typeof itemSchemaResRelated>

/** Zod schema for the response with multiple items (without relations). */
export const itemSchemaResList = listSchema(itemSchemaRes)
/** Type of the response with multiple items (without relations). */
export type ItemResList = z.infer<typeof itemSchemaResList>

/** Zod schema for the response with multiple items (with relations). */
export const itemSchemaResListRelated = listSchema(itemSchemaResRelated)
/** Type of the response with multiple items (with relations). */
export type ItemResListRelated = z.infer<typeof itemSchemaResListRelated>

/** Zod schema for pagination, in the request body or query string. */
export const itemSchemaPagi = pagiSchema(filterKeys)
/** Type of pagination, from the request body or query string. */
export type ItemPagi = z.infer<typeof itemSchemaPagi>

/** Zod schema for the search request body. */
export const itemSchemaFilter =
  filterSchema(filterKeys, itemSchema.shape).merge(itemSchemaPagi)
/** Type of the search request body. */
export type ItemFilter = z.infer<typeof itemSchemaFilter>
