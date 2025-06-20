import {z} from 'zod'

import {MESSAGE} from '@shared/const'
import conf from '@shared/conf'
import {createdAtSchema, pagiSchema, listSchema} from '@shared/schemas/base'
import {userSchema} from '@shared/schemas/User'

export enum ItemPropFilter {
  Name = 'name',
  Category = 'category',
  Price = 'price',
  Stock = 'stock',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
  // orderBy username actually
  User = 'user',
}

export enum ItemCategory {
  Book = 'book',
  Electronics = 'electronics',
  Misc = 'misc',
}

/** Requests for creation */
export const itemSchemaData = z.object({
  name: z.string().min(1).max(conf.NAME_MAX),
  category: z.nativeEnum(ItemCategory),
  price: z.number().nonnegative(),
  stock: z.number().int().nonnegative(),
  // only including relations on the owning side
  user: z.number().int().positive().optional(),
})
export type ItemData = z.infer<typeof itemSchemaData>

/** Requests for update */
export const itemSchemaDataOpt = itemSchemaData.partial()
export type ItemDataOpt = z.infer<typeof itemSchemaDataOpt>

/** Requests with pagination */
export const itemSchemaPagi = pagiSchema(ItemPropFilter)
export type ItemPagi = z.infer<typeof itemSchemaPagi>

/** Requests for search */
export const itemSchemaFilter = itemSchemaData.omit({
  price: true, stock: true,
}).extend({
  priceMin: z.number().nonnegative(),
  priceMax: z.number().nonnegative(),
  stockMin: z.number().int().nonnegative(),
  stockMax: z.number().int().nonnegative(),
}).partial().merge(itemSchemaPagi).and(createdAtSchema).refine((data) => {
  if (!data.priceMin || !data.priceMax) {
    return true
  }
  return data.priceMin <= data.priceMax
}, {
  message: MESSAGE.INV_PRICE,
  path: ['priceMin'],
}).refine((data) => {
  if (!data.stockMin || !data.stockMax) {
    return true
  }
  return data.stockMin <= data.stockMax
}, {
  message: MESSAGE.INV_STOCK,
  path: ['stockMin'],
})
export type ItemFilter = z.infer<typeof itemSchemaFilter>

/** Response with one item */
export const itemSchema = itemSchemaData.omit({user: true}).extend({
  id: z.number().int().positive(),
  // actually, if item.user is a reference, like for creation or update, it'll
  // be serialised to its primary key, which should also be included here for
  // frontend validation; typically id for creation or update, entity for
  // getting and search
  user: z.union([z.number().int().positive(), userSchema]).optional(),
})
export type ItemType = z.infer<typeof itemSchema>

/** Response with items */
export const itemsSchema = listSchema(itemSchema)
export type Items = z.infer<typeof itemsSchema>
