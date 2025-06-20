import {defineConfig} from '@mikro-orm/postgresql'
import path from 'path'

import {ENV} from '@shared/const'
import conf from '@/conf'
import {User, Item} from '@/models/entities'

console.log(conf)
export default defineConfig({
  clientUrl: conf.NODE_ENV === ENV.TEST ? conf.DB_URL_TEST : conf.DB_URL,
  entities: [User, Item],
  migrations: {
    path: path.join(__dirname,
      conf.NODE_ENV === ENV.TEST ? 'migrationstest' : 'migrations'),
    emit: 'ts',
  },
  debug: conf.NODE_ENV === ENV.DBG || conf.NODE_ENV === ENV.DEV ? true : false,
  /*
  driverOptions: {connection: {ssl: {rejectUnauthorized: true}}},
  */
})
