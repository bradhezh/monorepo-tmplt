import {format} from 'util'

import {ERROR, HttpStatus} from '@backend/const'

export class MiddlewareErr extends Error {
  name = ERROR.MIDDLEWARE

  constructor(public status: HttpStatus, ...messages: unknown[]) {
    super(format(...messages))
  }
}
