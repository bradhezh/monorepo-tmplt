// dotenv sets env vars from .env (in the cwd)
import dotenv from 'dotenv'

import {Conf as CommonConf, conf as commonConf} from '@shared/conf'

interface Conf extends CommonConf {
  PORT: number
  VER_EP: string
  VERSION: number
}

dotenv.config()
export const conf: Conf = {
  ...commonConf,
  // env vars set by cli
  ENV: process.env.NODE_ENV,
  // env vars set by dotenv
  PORT: Number(process.env.PORT) || 3000,
  VER_EP: '/version',
  VERSION: 0,
}
