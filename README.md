# @bradhezh/controllers
A collection of Express.js middleware (backend) and React hooks (frontend) for **reusable domain logic** (controllers), currently supporting user and permission management.

---
## Quick Start
### Installation
```bash
npm install @bradhezh/controllers
```

### Backend
```js
const middleware = require('@bradhezh/controllers/middleware')
const logConf = require('./models/log/mikro-orm.config')

...
const DI = {}
DI.db = await MikroORM.init()
DI.em = DI.db.em
const logDb = await MikroORM.init(logConf)
middleware.init({em: DI.em, jwtSecret: conf.SECRET, logEm: logDb.em})
middleware.log.info('Database connected.')

app.use((req, res, next) => {
  RequestContext.create(DI.em, next)
})
app.use(conf.LOGIN_EP, middleware.loginRouter)
app.use(conf.USERS_EP, middleware.usersRouter)
app.use(middleware.unknownEp)
app.use(middleware.errHandler)
```

### Frontend
```js
import {useGlobalUser} from '@bradhezh/controllers'

function LoginPage() {
  const {login} = useGlobalUser()

  ...
  await login({username, password})
  ...
}
```

---
## Full API Documentation
[View Documentation →](https://bradhezh.github.io/monorepo-doc/)
