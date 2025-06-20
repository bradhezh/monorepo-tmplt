import {DI} from '@/app'
import {
  Ids, UserPagi, UserFilter, UserData, UserDataOpt, UserType, Users,
} from '@shared/schemas'
import {User} from '@/models/entities'

export const getAll = async (pagi: UserPagi): Promise<Users> => {
  const em = DI.getEm()
  const [list, total] = await em.findAndCount(User, {}, {
    ...(pagi.orderBy && {orderBy: {[pagi.orderBy]: pagi.order}}),
    limit: pagi.pageSize,
    offset: (pagi.page - 1) * pagi.pageSize,
  })
  return {list, total}
}

export const getById = async (id: number): Promise<UserType> => {
  const em = DI.getEm()
  const user = await em.findOneOrFail(User, id)
  return user
}

export const search = async (filter: UserFilter): Promise<Users> => {
  const em = DI.getEm()
  const [list, total] = await em.findAndCount(User, {
    ...(filter.username && {username: filter.username}),
    ...(filter.name && {name: {$like: `%${filter.name}%`}}),
    ...(filter.email && {email: filter.email}),
    ...((filter.createdAtMin || filter.createdAtMax) && {
      createdAt: {
        ...(filter.createdAtMin && {$gte: filter.createdAtMin}),
        ...(filter.createdAtMax && {$lte: filter.createdAtMax}),
      },
    }),
  }, {
    ...(filter.orderBy && {orderBy: {[filter.orderBy]: filter.order}}),
    limit: filter.pageSize,
    offset: (filter.page - 1) * filter.pageSize,
  })
  return {list, total}
}

export const create = async (data: UserData): Promise<UserType> => {
  const em = DI.getEm()
  const user = em.create(User, data)
  await em.flush()
  return user
}

export const update = async (
  id: number, data: UserDataOpt,
): Promise<UserType> => {
  const em = DI.getEm()
  const user = await em.findOneOrFail(User, id)
  Object.assign(user, data)
  await em.flush()
  return user
}

export const remove = async (id: number) => {
  const em = DI.getEm()
  await em.nativeDelete(User, id)
}

export const removeBulk = async (ids: Ids) => {
  const em = DI.getEm()
  await em.nativeDelete(User, {id: {$in: ids}})
}

export default {getAll, getById, search, create, update, remove, removeBulk}
