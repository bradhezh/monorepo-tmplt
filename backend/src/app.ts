import express from 'express'
import 'express-async-errors'
import {MikroORM, EntityManager, RequestContext} from '@mikro-orm/core'

import {ENV} from '@shared/const'
import {MESSAGE} from '@/const'
import conf from '@/conf'
import log from '@/utils/log'
import confDb from '@/models/mikro-orm.config'
import confLog from '@/models/log/mikro-orm.config'
import {reqLogger, unknownEp, errHandler} from '@/utils/middleware'
import usersRouter from '@/controllers/users'
import itemsRouter from '@/controllers/items'

export const DI: {
  db?: MikroORM
  dbLog?: MikroORM
  em?: EntityManager
  getEm: () => EntityManager
} = {
  getEm() {
    if (!this.em) {
      throw new Error(MESSAGE.EM_UNINITED)
    }
    return this.em
  },
}

export const app = express()

export const init = async () => {
  DI.db = await MikroORM.init(confDb)
  DI.em = DI.db.em
  if (conf.NODE_ENV === ENV.DBG) {
    DI.dbLog = await MikroORM.init(confLog)
    log.init({em: DI.dbLog.em})
  }

  // middleware mounted by `app.<method>(...)` is called (valid) only if
  // requests match the method and path (route) exactly (only with minor
  // tolerance like the trailing slash), while `app.use(...)` adopts prefix
  // -based matching and the matched prefix will be stripped from `req.url`
  // before it's passed to the middleware, so a router should exclude the
  // matched prefix from its own routes

  // give static (files) priority over subsequent middleware for `GET`; the path
  // is relative to the cwd
  app.use(express.static(conf.DIST_DIR))
  // deserialise json in requests into `req.body`
  app.use(express.json())

  app.use(reqLogger)

  // overridden by dist/index.html due to `express.static(...)`
  app.get('/', (_req, res) => {
    res.send('<h1>Hello world!</h1>')
  })
  // for deployment or health check
  app.get(conf.VER_EP, (_req, res) => {
    res.json(conf.VERSION)
  })

  app.use((_req, _res, next) => {
    RequestContext.create(DI.getEm(), next)
  })
  app.use(conf.ITEMS_EP, itemsRouter)
  app.use(conf.USERS_EP, usersRouter)
  app.use(unknownEp)
  app.use(errHandler)
}
