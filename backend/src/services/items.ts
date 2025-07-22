import {Prisma} from '@PrismaClient/.'
import {
  itemRelations, orderByDefs, Order,
  ItemData, ItemDataOpt, ItemPagi, ItemFilter, ItemRes, ItemResRelated,
} from '@shared/schemas'
import {prisma} from '@/app'

type ItemResPrisma = Omit<ItemRes, 'category' | 'price'>
  & {category: string} & {price: Prisma.Decimal}
type ItemResRelatedPrisma = Omit<ItemResRelated, 'category' | 'price'>
  & {category: string} & {price: Prisma.Decimal}
type ItemResListPrisma = [ItemResPrisma[], number]
type ItemResListRelatedPrisma = [ItemResRelatedPrisma[], number]

const orderBy = (key: string, order: Order) => {
  if (!Object.keys(itemRelations()).map(e => `${e}_id`).includes(key)) {
    return {orderBy: {[key]: order}}
  }
  const relation = key.replace(/_id$/, '') as keyof typeof orderByDefs
  const orderByDef = orderByDefs[relation]
  return !orderByDef
    ? {orderBy: {[key]: order}} : {orderBy: {[relation]: {[orderByDef]: order}}}
}

export const getAll = async (
  pagi: ItemPagi, relations?: string[],
): Promise<ItemResListPrisma | ItemResListRelatedPrisma> => {
  return Promise.all([
    prisma.item.findMany({
      skip: (pagi.page - 1) * pagi.pageSize,
      take: pagi.pageSize,
      ...(!pagi.orderBy ? {} : orderBy(pagi.orderBy as string, pagi.order)),
      ...(!relations?.length
        ? {} : {include: Object.fromEntries(relations.map(e => [e, true]))}),
    }),
    prisma.item.count(),
  ])
}

export const getById = async (
  id: number, relations?: string[],
): Promise<ItemResPrisma | ItemResRelatedPrisma> => {
  return prisma.item.findUniqueOrThrow({
    where: {id},
    ...(!relations?.length
      ? {} : {include: Object.fromEntries(relations.map(e => [e, true]))}),
  })
}

export const search = async (
  filter: ItemFilter, relations?: string[],
): Promise<ItemResListPrisma | ItemResListRelatedPrisma> => {
  const {
    page, pageSize, order,
    orderBy: pagiOrderBy,
    ...where
  } = filter
  return Promise.all([
    prisma.item.findMany({
      where,
      skip: (page as number - 1) * (pageSize as number),
      take: pageSize as number,
      ...(!pagiOrderBy ? {} : orderBy(pagiOrderBy as string, order as Order)),
      ...(!relations?.length
        ? {} : {include: Object.fromEntries(relations.map(e => [e, true]))}),
    }),
    prisma.item.count({where}),
  ])
}

export const create = async (
  data: ItemData, relations?: string[],
): Promise<ItemResPrisma | ItemResRelatedPrisma> => {
  /* only for like mongo without foreign key constraints
  if (data.user_id) {
    await prisma.user.findUniqueOrThrow({
      where: {id: data.user_id},
    })
  }
  */
  return prisma.item.create({
    data,
    ...(!relations?.length
      ? {} : {include: Object.fromEntries(relations.map(e => [e, true]))}),
  })
}

export const update = async (
  id: number, data: ItemDataOpt, relations?: string[],
): Promise<ItemResPrisma | ItemResRelatedPrisma> => {
  /* only for like mongo without foreign key constraints
  if (data.user_id) {
    await prisma.user.findUniqueOrThrow({
      where: {id: data.user_id},
    })
  }
  */
  return prisma.item.update({
    where: {id},
    data: {
      ...data,
      updated_at: new Date(),
    },
    ...(!relations?.length
      ? {} : {include: Object.fromEntries(relations.map(e => [e, true]))}),
  })
}

export const remove = async (id: number): Promise<ItemResPrisma> => {
  return prisma.item.delete({where: {id}})
}

export const removeBulk = async (ids: number[]) => {
  return prisma.item.deleteMany({where: {id: {in: ids}}})
}

export default {getAll, getById, search, create, update, remove, removeBulk}
