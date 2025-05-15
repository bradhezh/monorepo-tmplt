import express from 'express'

import conf from '@backend/conf'
import {unknownEp, errHandler} from '@backend/utils/middleware'
import diariesRouter from '@backend/controllers/diaries'

console.log(conf)

const app = express()

app.use(express.static('dist'))
app.use(express.json())

app.get('/', (_req, res) => {
  res.send('<h1>Hello world!</h1>')
})
app.get(conf.VER_EP, (_req, res) => {
  res.json(conf.VERSION)
})

await new Promise((resolve, _reject) => {
  setTimeout(() => resolve(0), 1000)
})
app.use('/api/diaries', diariesRouter)
app.use(unknownEp)
app.use(errHandler)

export default app
