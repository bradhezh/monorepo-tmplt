import {DI, app, init} from '@/app'
import conf from '@/conf'
import log from '@/utils/log'

void (async () => {
  try {
    await init()
    app.listen(conf.PORT, () => {
      log.info(`Server running on port ${conf.PORT}`).catch(console.log)
    })
  } catch (err) {
    if (err instanceof Error) {
      return log.error(`${err.name}: ${err.message}`).catch(console.log)
    }
    log.error(err).catch(console.log)
  } finally {
    await DI.db?.close()
    await DI.dbLog?.close()
  }
})()

/*
import {MikroORM} from '@mikro-orm/core'

import log from '@/utils/log'
import confDb from '@/models/mikro-orm.config'
import confLog from '@/models/log/mikro-orm.config'
import {User, Item} from '@/models/entities'
import {Log} from '@/models/log/entities'

let db, dbLog
void (async () => {
  try {
    db = await MikroORM.init(confDb)
    dbLog = await MikroORM.init(confLog)
    const em = db.em.fork()
    const emLog = dbLog.em.fork()
    log.init({em: emLog})

    const items = await em.find(Item, {})
    const users = await em.find(User, {})
    const logs = await emLog.find(Log, {})
    await log.debug(items)
    await log.debug(users)
    await log.debug(logs)

  } catch (err) {
    console.log(err)

  } finally {
    await db?.close()
    await dbLog?.close()
  }
})()
*/
