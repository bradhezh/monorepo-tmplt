import {ENV} from '@shared/const'
import conf from '@backend/conf'

/** No effect for "test".
  @param params - Format sequences like "%s", "%d" can be used in params. */
export const info = (...params: unknown[]) => {
  if (conf.NODE_ENV === ENV.TEST) {
    return
  }
  console.log(new Date(), ':', ...params)

  if (conf.NODE_ENV !== ENV.DBG) {
    return
  }
  // write to the db
}

/** Only effective for "debug" or development.
  @param params - Format sequences like "%s", "%d" can be used in params. */
export const debug = (...params: unknown[]) => {
  if (conf.NODE_ENV !== ENV.DBG && conf.NODE_ENV !== ENV.DEV) {
    return
  }
  console.log(new Date(), ':', ...params)

  if (conf.NODE_ENV !== ENV.DBG) {
    return
  }
  // write to the db
}

/** @param params - Format sequences like "%s", "%d" can be used in params. */
export const error = (...params: unknown[]) => {
  console.error(new Date(), ':', 'error:', ...params)

  if (conf.NODE_ENV !== ENV.DBG) {
    return
  }
  // write to the db
}

/** Logs will be written into the database (only) for "debug". */
export default {info, debug, error}
