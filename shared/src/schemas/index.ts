export * from './base'
export * from './User'
export * from './Item'

import {userExcludes, userOrderBy} from './User'
import {itemExcludes, itemOrderBy} from './Item'

export const omit = {
  ...(!userExcludes.length
    ? {} : {user: Object.fromEntries(userExcludes.map(e => [e, true]))}),
  ...(!itemExcludes.length
    ? {} : {item: Object.fromEntries(itemExcludes.map(e => [e, true]))}),
} as const

export const orderByDefs = {
  user: userOrderBy,
  item: itemOrderBy,
} as const
