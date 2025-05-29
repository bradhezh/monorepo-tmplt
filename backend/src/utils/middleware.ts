import {Request, Response, NextFunction} from 'express'
import {z} from 'zod'
import path from 'path'
import {format} from 'util'

import {ENV} from '@shared/const'
import {HTTP_STATUS, HttpStatus, ERROR, MESSAGE} from '@backend/const'
import conf from '@backend/conf'
import log from '@backend/utils/log'
import {DiarySchema} from '@backend/data/diaries'

export class MiddlewareErr extends Error {
  name = ERROR.MIDDLEWARE

  /** @param messages
    Format sequences like "%s", "%d" can be used in messages. */
  constructor(public status: HttpStatus, ...messages: unknown[]) {
    super(format(...messages))
  }
}

/** Log requests before they're handled, only for "debug" and development. */
export const reqLogger = (req: Request, _res: Response, next: NextFunction) => {
  log.debug(req.method, req.path)
  if (conf.NODE_ENV === ENV.DEV) {
    log.debug(req.body)
  }
  next()
}

export const unknownEp = (_req: Request, res: Response, next: NextFunction) => {
  log.debug(MESSAGE.UNKNOWN_EP)
  if (!conf.SPA) {
    throw new MiddlewareErr(HTTP_STATUS.NOT_FOUND, MESSAGE.UNKNOWN_EP)
  }
  // in spa, site routes are handled by frontend, so for any unknown endpoint,
  // the page should be sent back for the frontend to handle the route
  res.sendFile(path.join(process.cwd(), conf.SPA), next)
}

export const errHandler = (
  err: unknown, _req: Request, res: Response, next: NextFunction,
) => {

  // type narrowing
  if (!(err instanceof Error)) {
    throw new Error(MESSAGE.UNKNOWN)
  }
  log.error(err.name, err.message)

  if (err instanceof z.ZodError) {
    // causing frontend axios to throw "error" including the object from json as
    // error.response.data
    return res.status(HTTP_STATUS.BAD_REQ).json({message: err.message})
  }

  if (err instanceof MiddlewareErr) {
    return res.status(err.status).json({message: err.message})
  }

  // pass to the default one
  next(err)
}

/** Validate req.body as type DiaryData. req.validatedBody will be the validated
  one. */
export const diaryParser = (
  req: Request, _res: Response, next: NextFunction,
) => {

  // based on zod schemas, still throwing errors when failing
  req.validatedBody = DiarySchema.parse(req.body)
  next()
}
