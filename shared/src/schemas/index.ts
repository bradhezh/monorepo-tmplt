export * from './base'
export * from './User'
export * from './Item'

import {userExcludes} from './User'
import {itemExcludes} from './Item'

export const omit = {
  ...(!userExcludes.length
    ? {} : {user: Object.fromEntries(userExcludes.map(e => [e, true]))}),
  ...(!itemExcludes.length
    ? {} : {item: Object.fromEntries(itemExcludes.map(e => [e, true]))}),
} as const
