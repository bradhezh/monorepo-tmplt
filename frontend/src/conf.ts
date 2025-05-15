import type {Conf as CommonConf} from '@shared/conf'
import {conf as commonConf} from '@shared/conf'

interface Conf extends CommonConf {
  API_URL: string
}

export const conf: Conf = {
  ...commonConf,
  // env vars set by cli
  ENV: import.meta.env.MODE,
  // env vars set by dotenv
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  API_URL: import.meta.env.VITE_API_URL,
}
