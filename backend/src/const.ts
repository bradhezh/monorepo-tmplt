import {MESSAGE as MESSAGE_COMMON} from '@shared/const'
export * from '@shared/const'

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQ: 400,
  UNAUTHED: 401,
  NOT_FOUND: 404,
  INTERNAL_SVR_ERR: 500,
} as const

export type HttpStatus = typeof HTTP_STATUS[keyof typeof HTTP_STATUS]

export const ERROR = {
  MIDDLEWARE: 'MiddlewareErr',
} as const

export const MESSAGE = {
  ...MESSAGE_COMMON,

  APP_STARTED: 'Server running on port %d.',
  UNKNOWN_EP: 'Unknown endpoint.',
  UNKNOWN: 'Unknown error.',
} as const
