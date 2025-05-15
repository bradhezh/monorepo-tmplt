import {Request, Response, NextFunction} from 'express'
import {z} from 'zod'

import {DiarySchema} from '../types/types'

export const unknownEp = (_req: Request, res: Response) => {
  console.log('Unknown endpoint.')
  res.status(400).json('Unknown endpoint.')
}

export const errHandler = (
  err: unknown, _req: Request, res: Response, next: NextFunction,
) => {

  // type narrowing
  if (!(err instanceof Error)) {
    throw new Error('Unknown error.')
  }
  console.log(err.name, err.message)
  if (err instanceof z.ZodError) {
    return res.status(400).json({error: err.issues})
  }

  return next(err)
}

// validators
export const diaryParser = (
  req: Request, _res: Response, next: NextFunction,
) => {

  // validation based on zod schemas, still throws errors when failing
  req.validatedBody = DiarySchema.parse(req.body)
  next()
}
