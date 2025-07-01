import {format} from 'util'
import {EntityManager} from '@mikro-orm/core'

import {ENV} from '@shared/const'
import conf from '@/conf'
import {Log} from '@/models/log/entities'

const DI: {em?: EntityManager} = {}

export const init = ({em}: {em: EntityManager}) => {
  DI.em = em
}

/** No effect for "test".
  @param params - Format sequences like `%s`, `%d` can be used in params. */
export const info = async (...params: unknown[]) => {
  if (conf.NODE_ENV === ENV.TEST) {
    return
  }
  console.log(new Date(), ':', format(...params))

  if (conf.NODE_ENV !== ENV.DBG || !DI.em) {
    return
  }
  // write to the db
  const em = DI.em.fork()
  em.create(Log, {
    type: 'info',
    message: format(...params),
  })
  await em.flush()
}

/** Only effective for "debug" or development.
  @param params - Format sequences like `%s`, `%d` can be used in params. */
export const debug = async (...params: unknown[]) => {
  if (conf.NODE_ENV !== ENV.DBG && conf.NODE_ENV !== ENV.DEV) {
    return
  }
  console.log(new Date(), ':', format(...params))

  if (conf.NODE_ENV !== ENV.DBG || !DI.em) {
    return
  }
  // write to the db
  const em = DI.em.fork()
  em.create(Log, {
    type: 'debug',
    message: format(...params),
  })
  await em.flush()
}

/** @param params - Format sequences like `%s`, `%d` can be used in params. */
export const error = async (...params: unknown[]) => {
  console.error(new Date(), ':', 'error:', format(...params))

  if (conf.NODE_ENV !== ENV.DBG || !DI.em) {
    return
  }
  // write to the db
  const em = DI.em.fork()
  em.create(Log, {
    type: 'error',
    message: format(...params),
  })
  await em.flush()
}

/** Logs will be written into the database (only) for "debug". */
export default {init, info, debug, error}
