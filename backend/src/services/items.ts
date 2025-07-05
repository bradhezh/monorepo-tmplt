import {DI} from '@/app'
import {
  Ids, ItemPagi, ItemFilter, ItemData, ItemDataOpt, ItemType, Items,
  Order, ItemPropFilter, UserPropFilter,
} from '@shared/schemas'
/*
import {User} from '@/models/entities'
*/
import {Item} from '@/models/entities'

const orderBy = (prop: ItemPropFilter, order: Order) => {
  if (prop !== ItemPropFilter.User) {
    return {orderBy: {[prop]: order}}
  }
  return {orderBy: {[prop]: {[UserPropFilter.Username]: order}}}
}

export const getAll = async (pagi: ItemPagi): Promise<Items> => {
  const em = DI.getEm()
  const [list, total] = await em.findAndCount(Item, {}, {
    ...(pagi.orderBy && orderBy(pagi.orderBy, pagi.order)),
    limit: pagi.pageSize,
    offset: (pagi.page - 1) * pagi.pageSize,
    populate: [ItemPropFilter.User],
  })
  return {list, total}
}

export const getById = async (id: number): Promise<ItemType> => {
  const em = DI.getEm()
  const item =
    await em.findOneOrFail(Item, id, {populate: [ItemPropFilter.User]})
  return item
}

export const search = async (filter: ItemFilter): Promise<Items> => {
  const em = DI.getEm()
  const [list, total] = await em.findAndCount(Item, {
    ...(filter.category && {category: filter.category}),
    ...(filter.user && {user: filter.user}),
    ...(filter.name && {name: {$like: `%${filter.name}%`}}),
    ...((filter.priceMin || filter.priceMax) && {
      price: {
        ...(filter.priceMin && {$gte: filter.priceMin}),
        ...(filter.priceMax && {$lte: filter.priceMax}),
      },
    }),
    ...((filter.stockMin || filter.stockMax) && {
      stock: {
        ...(filter.stockMin && {$gte: filter.stockMin}),
        ...(filter.stockMax && {$lte: filter.stockMax}),
      },
    }),
    ...((filter.createdAtMin || filter.createdAtMax) && {
      createdAt: {
        ...(filter.createdAtMin && {$gte: filter.createdAtMin}),
        ...(filter.createdAtMax && {$lte: filter.createdAtMax}),
      },
    }),
  }, {
    ...(filter.orderBy && orderBy(filter.orderBy, filter.order)),
    limit: filter.pageSize,
    offset: (filter.page - 1) * filter.pageSize,
    populate: [ItemPropFilter.User],
  })
  return {list, total}
}

export const create = async (data: ItemData): Promise<ItemType> => {
  const em = DI.getEm()
  /* only for like mongo without foreign key constraints
  if (data.user) {
    await em.findOneOrFail(User, data.user)
  }
  */
  // user id can be specified in data, and then `item.user` created will be a
  // reference (unless the related user is already cached)
  const item = em.create(Item, data)
  await em.flush()
  return item
}

export const update = async (
  id: number, data: ItemDataOpt,
): Promise<ItemType> => {
  const em = DI.getEm()
  /* only for like mongo without foreign key constraints
  if (data.user) {
    await em.findOneOrFail(User, data.user)
  }
  */
  // user id can be specified in data, and then `item.user` updated will still
  // be a reference (unless the related user is already cached)
  const item = await em.findOneOrFail(Item, id)
  Object.assign(item, data)
  await em.flush()
  return item
}

export const remove = async (id: number) => {
  const em = DI.getEm()
  await em.nativeDelete(Item, id)
}

export const removeBulk = async (ids: Ids) => {
  const em = DI.getEm()
  await em.nativeDelete(Item, {id: {$in: ids}})
}

export default {getAll, getById, search, create, update, remove, removeBulk}
