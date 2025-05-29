import express from 'express'
import 'express-async-errors'

import conf from '@backend/conf'
import {reqLogger, unknownEp, errHandler} from '@backend/utils/middleware'
import diariesRouter from '@backend/controllers/diaries'

export const app = express()

// middleware mounted by app.<method>(...) is called (valid) only if requests
// match the method and path (route) exactly (only with minor tolerance like the
// trailing slash), while app.use(...) adopts prefix-based matching and the
// matched prefix will be stripped from req.url before it's passed to the
// middleware, so a router should exclude the matched prefix from its own routes

// give static (files) priority over subsequent middleware for GET; the path is
// relative to the cwd
app.use(express.static(conf.DIST_DIR))
// deserialise json in requests into req.body
app.use(express.json())

app.use(reqLogger)

// overridden by dist/index.html due to express.static(...)
app.get('/', (_req, res) => {
  res.send('<h1>Hello world!</h1>')
})
// for deployment or health check
app.get(conf.VER_EP, (_req, res) => {
  res.json(conf.VERSION)
})

app.use(conf.ITEMS_EP, diariesRouter)
app.use(unknownEp)
app.use(errHandler)

export default app
