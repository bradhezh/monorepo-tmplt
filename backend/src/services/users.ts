import bcrypt from 'bcrypt'

import conf from '@/conf'
import {
  UserData, UserDataOpt, UserPagi, UserFilter,
  UserRes, UserResRelated, UserResList, UserResListRelated,
} from '@shared/schemas'
import {prisma} from '@/app'

export const getAll = async (
  pagi: UserPagi, relations?: string[],
): Promise<UserResList | UserResListRelated> => {
  return Promise.all([
    prisma.user.findMany({
      skip: (pagi.page - 1) * pagi.pageSize,
      take: pagi.pageSize,
      ...(!pagi.orderBy
        ? {} : {orderBy: {[pagi.orderBy as string]: pagi.order}}),
      ...(!relations?.length
        ? {} : {include: Object.fromEntries(relations.map(e => [e, true]))}),
    }),
    prisma.user.count(),
  ])
}

export const getById = async (
  id: number, relations?: string[],
): Promise<UserRes | UserResRelated> => {
  return prisma.user.findUniqueOrThrow({
    where: {id},
    ...(!relations?.length
      ? {} : {include: Object.fromEntries(relations.map(e => [e, true]))}),
  })
}

export const search = async (
  filter: UserFilter, relations?: string[],
): Promise<UserResList | UserResListRelated> => {
  const {page, pageSize, order, orderBy, ...where} = filter
  return Promise.all([
    prisma.user.findMany({
      where,
      skip: (page as number - 1) * (pageSize as number),
      take: pageSize as number,
      ...(!orderBy ? {} : {orderBy: {[orderBy as string]: order}}),
      ...(!relations?.length
        ? {} : {include: Object.fromEntries(relations.map(e => [e, true]))}),
    }),
    prisma.user.count({where}),
  ])
}

export const create = async (
  data: UserData, relations?: string[],
): Promise<UserRes | UserResRelated> => {
  data.password = await bcrypt.hash(data.password, conf.SALT)
  return prisma.user.create({
    data,
    ...(!relations?.length
      ? {} : {include: Object.fromEntries(relations.map(e => [e, true]))}),
  })
}

export const update = async (
  id: number, data: UserDataOpt, relations?: string[],
): Promise<UserRes | UserResRelated> => {
  return prisma.user.update({
    where: {id},
    data: {
      ...data,
      updated_at: new Date(),
    },
    ...(!relations?.length
      ? {} : {include: Object.fromEntries(relations.map(e => [e, true]))}),
  })
}

export const remove = async (id: number): Promise<UserRes> => {
  return prisma.user.delete({where: {id}})
}

export const removeBulk = async (ids: number[]) => {
  return prisma.user.deleteMany({where: {id: {in: ids}}})
}

export default {getAll, getById, search, create, update, remove, removeBulk}
