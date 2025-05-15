// dotenv sets env vars from .env (in the cwd, only used locally)
import dotenv from 'dotenv'

import common from '@shared/conf'

dotenv.config()

const conf = {
  ...common,

  // set by cli
  ENV: process.env.NODE_ENV,

  // env vars set by dotenv locally or the cloud, or defaults for cicd testing
  SECRET: process.env.SECRET || 'alskjfeoicvinef',
  // in the cloud, PORT is auto set and then should be excluded
  PORT: Number(process.env.PORT) || 3000,
  // not for testing and then no default needed
  DB_NAME: process.env.DB_NAME,
  // flexible or sensitive for testing and then should be set by cicd and no
  // default needed; only for testing (..._TEST) and then should be excluded in
  // the cloud
  DB_NAME_TEST: process.env.DB_NAME_TEST,

  VER_EP: '/version',
  VERSION: 0,
}

export default conf
