import {default as express, Request, Response} from 'express'
import {z} from 'zod'
import bcrypt from 'bcrypt'

import {HTTP_STATUS} from '@/const'
import conf from '@/conf'
import {
  idsSchema, Ids,
  userSchemaPagi, UserPagi, userSchemaFilter, UserFilter,
  userSchemaData, UserData, userSchemaDataOpt, UserDataOpt,
  UserType, Users,
} from '@shared/schemas'
import usersSvc from '@/services/users'

export const usersRouter = express.Router()

/** GET /api/users */
export const getAll = async (
  req: Request<unknown, unknown, UserPagi>, res: Response<Users>,
) => {
  const pagi = userSchemaPagi.parse(req.body)
  const users = await usersSvc.getAll(pagi)
  res.json(users)
}
// eslint-disable-next-line @typescript-eslint/no-misused-promises
usersRouter.get('/', getAll)

/** GET /api/users/id/:id */
export const getById = async (req: Request, res: Response<UserType>) => {
  const id = z.coerce.number().int().positive().parse(req.params.id)
  const user = await usersSvc.getById(id)
  res.json(user)
}
// eslint-disable-next-line @typescript-eslint/no-misused-promises
usersRouter.get(conf.BY_ID, getById)

/** POST /api/users/search */
export const search = async (
  req: Request<unknown, unknown, UserFilter>, res: Response<Users>,
) => {
  const filter = userSchemaFilter.parse(req.body)
  const users = await usersSvc.search(filter)
  res.json(users)
}
// eslint-disable-next-line @typescript-eslint/no-misused-promises
usersRouter.post(conf.SEARCH, search)

/** POST /api/users */
export const create = async (
  req: Request<unknown, unknown, UserData>, res: Response<UserType>,
) => {
  const data = userSchemaData.parse(req.body)
  data.password = await bcrypt.hash(data.password, conf.SALT)
  const user = await usersSvc.create(data)
  res.status(HTTP_STATUS.CREATED).json(user)
}
// eslint-disable-next-line @typescript-eslint/no-misused-promises
usersRouter.post('/', create)

/** PATCH /api/users/id/:id */
export const update = async (
  req: Request<{id: string}, unknown, UserDataOpt>, res: Response<UserType>,
) => {
  const id = z.coerce.number().int().positive().parse(req.params.id)
  const data = userSchemaDataOpt.parse(req.body)
  if (data.password) {
    data.password = await bcrypt.hash(data.password, conf.SALT)
  }
  const user = await usersSvc.update(id, data)
  res.json(user)
}
// eslint-disable-next-line @typescript-eslint/no-misused-promises
usersRouter.patch(conf.BY_ID, update)

/** DELETE /api/users/id/:id */
export const remove = async (req: Request, res: Response) => {
  const id = z.coerce.number().int().positive().parse(req.params.id)
  await usersSvc.remove(id)
  res.status(HTTP_STATUS.NO_CONTENT)
}
// eslint-disable-next-line @typescript-eslint/no-misused-promises
usersRouter.delete(conf.BY_ID, remove)

/** DELETE /api/users */
export const removeBulk = async (
  req: Request<unknown, unknown, Ids>, res: Response,
) => {
  const ids = idsSchema.parse(req.body)
  await usersSvc.removeBulk(ids)
  res.status(HTTP_STATUS.NO_CONTENT)
}
// eslint-disable-next-line @typescript-eslint/no-misused-promises
usersRouter.delete('/', removeBulk)

export default usersRouter
