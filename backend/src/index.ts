import {app, init} from '@/app'
import {MESSAGE} from '@/const'
import conf from '@/conf'
import log from '@/utils/log'

void (async () => {
  try {
    await init()
    app.listen(conf.PORT, () => {
      log.info(MESSAGE.APP_STARTED, conf.PORT).catch(console.log)
    })
  } catch (err) {
    if (err instanceof Error) {
      return log.error(`${err.name}: ${err.message}`).catch(console.log)
    }
    log.error(err).catch(console.log)
  }
})()
