import {default as express, Request, Response} from 'express'

import {HTTP_STATUS} from '@/const'
import conf from '@/conf'
import {
  itemRelations, idSchema, idsSchema, relatedSchema,
  itemSchemaData, itemSchemaDataOpt, itemSchemaPagi, itemSchemaFilter,
} from '@shared/schemas'
import itemsSvc from '@/services/items'

export const itemsRouter = express.Router()

/** `GET /api/items[?related=true&page=...&pageSize=...&order=...&orderBy=...]`
  <br>=> `ItemResList | ItemResListRelated` */
export const getAll = async (req: Request, res: Response) => {
  const related = relatedSchema.parse(req.query.related)
  const pagi = itemSchemaPagi.parse(req.query)
  const items = await itemsSvc.getAll(
    pagi, !related ? undefined : Object.keys(itemRelations()))
  res.json(items)
}
itemsRouter.get('/', getAll)

/** `GET /api/items/id/:id[?related=true]`<br>
  => `ItemRes | ItemResRelated` */
export const getById = async (req: Request, res: Response) => {
  const related = relatedSchema.parse(req.query.related)
  const id = idSchema.parse(req.params.id)
  const item = await itemsSvc.getById(
    id, !related ? undefined : Object.keys(itemRelations()))
  res.json(item)
}
itemsRouter.get(conf.BY_ID, getById)

/** `POST /api/items/search[?related=true] ItemFilter`<br>
  => `ItemResList | ItemResListRelated` */
export const search = async (req: Request, res: Response) => {
  const related = relatedSchema.parse(req.query.related)
  const filter = itemSchemaFilter.parse(req.body)
  const items = await itemsSvc.search(
    filter, !related ? undefined : Object.keys(itemRelations()))
  res.json(items)
}
itemsRouter.post(conf.SEARCH, search)

/** `POST /api/items[?related=true] ItemData`<br>
  => `ItemRes | ItemResRelated` */
export const create = async (req: Request, res: Response) => {
  const related = relatedSchema.parse(req.query.related)
  const data = itemSchemaData.parse(req.body)
  const item = await itemsSvc.create(
    data, !related ? undefined : Object.keys(itemRelations()))
  res.status(HTTP_STATUS.CREATED).json(item)
}
itemsRouter.post('/', create)

/** `PATCH /api/items/id/:id[?related=true] ItemDataOpt`<br>
  => `ItemRes | ItemResRelated` */
export const update = async (req: Request, res: Response) => {
  const related = relatedSchema.parse(req.query.related)
  const id = idSchema.parse(req.params.id)
  const data = itemSchemaDataOpt.parse(req.body)
  const item = await itemsSvc.update(
    id, data, !related ? undefined : Object.keys(itemRelations()))
  res.json(item)
}
itemsRouter.patch(conf.BY_ID, update)

/** `DELETE /api/items/id/:id` */
export const remove = async (req: Request, res: Response) => {
  const id = idSchema.parse(req.params.id)
  await itemsSvc.remove(id)
  res.status(HTTP_STATUS.NO_CONTENT)
}
itemsRouter.delete(conf.BY_ID, remove)

/** `DELETE /api/items Ids` */
export const removeBulk = async (req: Request, res: Response) => {
  const ids = idsSchema.parse(req.body)
  await itemsSvc.removeBulk(ids)
  res.status(HTTP_STATUS.NO_CONTENT)
}
itemsRouter.delete('/', removeBulk)

export default itemsRouter
