import {default as express, Request, Response} from 'express'
import {z} from 'zod'

import {HTTP_STATUS} from '@/const'
import conf from '@/conf'
import {
  idsSchema, Ids,
  itemSchemaPagi, ItemPagi, itemSchemaFilter, ItemFilter,
  itemSchemaData, ItemData, itemSchemaDataOpt, ItemDataOpt,
  ItemType, Items,
} from '@shared/schemas'
import itemsSvc from '@/services/items'

export const itemsRouter = express.Router()

/** `GET /api/items` */
export const getAll = async (
  req: Request<unknown, unknown, ItemPagi>, res: Response<Items>,
) => {
  const pagi = itemSchemaPagi.parse(req.body)
  const items = await itemsSvc.getAll(pagi)
  res.json(items)
}
// eslint-disable-next-line @typescript-eslint/no-misused-promises
itemsRouter.get('/', getAll)

/** `GET /api/items/id/:id` */
export const getById = async (req: Request, res: Response<ItemType>) => {
  const id = z.coerce.number().int().positive().parse(req.params.id)
  const item = await itemsSvc.getById(id)
  res.json(item)
}
// eslint-disable-next-line @typescript-eslint/no-misused-promises
itemsRouter.get(conf.BY_ID, getById)

/** `POST /api/items/search` */
export const search = async (
  req: Request<unknown, unknown, ItemFilter>, res: Response<Items>,
) => {
  const filter = itemSchemaFilter.parse(req.body)
  const items = await itemsSvc.search(filter)
  res.json(items)
}
// eslint-disable-next-line @typescript-eslint/no-misused-promises
itemsRouter.post(conf.SEARCH, search)

/** `POST /api/items` */
export const create = async (
  req: Request<unknown, unknown, ItemData>, res: Response<ItemType>,
) => {
  const data = itemSchemaData.parse(req.body)
  const item = await itemsSvc.create(data)
  res.status(HTTP_STATUS.CREATED).json(item)
}
// eslint-disable-next-line @typescript-eslint/no-misused-promises
itemsRouter.post('/', create)

/** `PATCH /api/items/id/:id` */
export const update = async (
  req: Request<{id: string}, unknown, ItemDataOpt>, res: Response<ItemType>,
) => {
  const id = z.coerce.number().int().positive().parse(req.params.id)
  const data = itemSchemaDataOpt.parse(req.body)
  const item = await itemsSvc.update(id, data)
  res.json(item)
}
// eslint-disable-next-line @typescript-eslint/no-misused-promises
itemsRouter.patch(conf.BY_ID, update)

/** `DELETE /api/items/id/:id` */
export const remove = async (req: Request, res: Response) => {
  const id = z.coerce.number().int().positive().parse(req.params.id)
  await itemsSvc.remove(id)
  res.status(HTTP_STATUS.NO_CONTENT)
}
// eslint-disable-next-line @typescript-eslint/no-misused-promises
itemsRouter.delete(conf.BY_ID, remove)

/** `DELETE /api/items` */
export const removeBulk = async (
  req: Request<unknown, unknown, Ids>, res: Response,
) => {
  const ids = idsSchema.parse(req.body)
  await itemsSvc.removeBulk(ids)
  res.status(HTTP_STATUS.NO_CONTENT)
}
// eslint-disable-next-line @typescript-eslint/no-misused-promises
itemsRouter.delete('/', removeBulk)

export default itemsRouter
