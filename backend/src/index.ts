import {app, init} from '@/app'
import conf from '@/conf'
import log from '@/utils/log'

void (async () => {
  try {
    await init()
    app.listen(conf.PORT, () => {
      log.info(`Server running on port ${conf.PORT}`)
    })
  } catch (err) {
    if (err instanceof Error) {
      return log.error(`${err.name}: ${err.message}`)
    }
    log.error(err)
  }
})()
