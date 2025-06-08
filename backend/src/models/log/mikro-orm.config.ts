import {defineConfig} from '@mikro-orm/mongodb'
import path from 'path'

import conf from '@/conf'
import {Log} from '@/models/log/entities'

export default defineConfig({
  clientUrl: conf.LOG_URL,
  ensureIndexes: true,
  implicitTransactions: true,
  entities: [Log],
  migrations: {path: path.join(__dirname, 'migrations'), emit: 'ts'},
  debug: false,
})
