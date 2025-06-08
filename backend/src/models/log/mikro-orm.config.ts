import {defineConfig} from '@mikro-orm/mongodb'
import path from 'path'

import {ENV} from '@shared/const'
import conf from '@/conf'
import {Log} from '@/models/log/entities'

export default defineConfig({
  clientUrl: conf.NODE_ENV === ENV.TEST ? conf.LOG_URL_TEST : conf.LOG_URL,
  ensureIndexes: true,
  implicitTransactions: true,
  entities: [Log],
  migrations: {
    path: path.join(__dirname,
      conf.NODE_ENV === ENV.TEST ? 'migrationstest' : 'migrations'),
    emit: 'ts',
  },
  debug: conf.NODE_ENV === ENV.DBG || conf.NODE_ENV === ENV.DEV ? true : false,
})
