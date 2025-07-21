import {default as express, Request, Response} from 'express'

import {HTTP_STATUS} from '@/const'
import conf from '@/conf'
import {
  paramSchemaId, querySchemaRelated, idsSchema, userRelations,
  userSchemaData, userSchemaDataOpt, userSchemaPagi, userSchemaFilter,
} from '@shared/schemas'
import usersSvc from '@/services/users'

export const usersRouter = express.Router()

/** `GET /api/users[?related=true] UserPagi`<br>
  => `UserResList | UserResListRelated` */
export const getAll = async (req: Request, res: Response) => {
  const related = querySchemaRelated.parse(req.query.related)
  const pagi = userSchemaPagi.parse(req.body)
  const users = await usersSvc.getAll(
    pagi, !related ? undefined : Object.keys(userRelations()))
  res.json(users)
}
usersRouter.get('/', getAll)

/** `GET /api/users/id/:id[?related=true]`<br>
  => `UserRes | UserResRelated` */
export const getById = async (req: Request, res: Response) => {
  const related = querySchemaRelated.parse(req.query.related)
  const id = paramSchemaId.parse(req.params.id)
  const user = await usersSvc.getById(
    id, !related ? undefined : Object.keys(userRelations()))
  res.json(user)
}
usersRouter.get(conf.BY_ID, getById)

/** `POST /api/users/search[?related=true] UserFilter`<br>
  => `UserResList | UserResListRelated` */
export const search = async (req: Request, res: Response) => {
  const related = querySchemaRelated.parse(req.query.related)
  const filter = userSchemaFilter.parse(req.body)
  const users = await usersSvc.search(
    filter, !related ? undefined : Object.keys(userRelations()))
  res.json(users)
}
usersRouter.post(conf.SEARCH, search)

/** `POST /api/users[?related=true] UserData`<br>
  => `UserRes | UserResRelated` */
export const create = async (req: Request, res: Response) => {
  const related = querySchemaRelated.parse(req.query.related)
  const data = userSchemaData.parse(req.body)
  const user = await usersSvc.create(
    data, !related ? undefined : Object.keys(userRelations()))
  res.status(HTTP_STATUS.CREATED).json(user)
}
usersRouter.post('/', create)

/** `PATCH /api/users/id/:id[?related=true] UserDataOpt`<br>
  => `UserRes | UserResRelated` */
export const update = async (req: Request, res: Response) => {
  const related = querySchemaRelated.parse(req.query.related)
  const id = paramSchemaId.parse(req.params.id)
  const data = userSchemaDataOpt.parse(req.body)
  const user = await usersSvc.update(
    id, data, !related ? undefined : Object.keys(userRelations()))
  res.json(user)
}
usersRouter.patch(conf.BY_ID, update)

/** `DELETE /api/users/id/:id` */
export const remove = async (req: Request, res: Response) => {
  const id = paramSchemaId.parse(req.params.id)
  await usersSvc.remove(id)
  res.status(HTTP_STATUS.NO_CONTENT)
}
usersRouter.delete(conf.BY_ID, remove)

/** `DELETE /api/users Ids` */
export const removeBulk = async (req: Request, res: Response) => {
  const ids = idsSchema.parse(req.body)
  await usersSvc.removeBulk(ids)
  res.status(HTTP_STATUS.NO_CONTENT)
}
usersRouter.delete('/', removeBulk)

export default usersRouter
