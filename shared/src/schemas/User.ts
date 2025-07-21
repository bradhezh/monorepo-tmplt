import {z} from 'zod'

import {pagiSchema, filterSchema, listSchema} from '@shared/schemas/base'
import {itemSchemaRes} from '@shared/schemas'
import {userSchema} from '@shared/schemas/prisma'

const autos = ['id', 'created_at', 'updated_at'] as const
export const userExcludes = ['password'] as const
export const userRelations = () => {return {items: itemSchemaRes.array()}}

const filterKeys = Object.keys(userSchema.shape).filter(
  (e) => !userExcludes.includes(e as typeof userExcludes[number]))

/** Requests for creation */
export const userSchemaData = userSchema.omit(Object.fromEntries(
  autos.map((e) => [e, true])) as {[E in typeof autos[number]]: true})
export type UserData = z.infer<typeof userSchemaData>

/** Requests for update */
export const userSchemaDataOpt = userSchemaData.partial().omit(
  Object.fromEntries(userExcludes.map((e) => [e, true])) as {
    [E in typeof userExcludes[number]]: true
  })
export type UserDataOpt = z.infer<typeof userSchemaDataOpt>

/** Response with one user (default) */
export const userSchemaRes = userSchema.omit(Object.fromEntries(
  userExcludes.map((e) => [e, true])) as {
    [E in typeof userExcludes[number]]: true
  })
export type UserRes = z.infer<typeof userSchemaRes>

/** Response with one user (related) */
export const userSchemaResRelated =
  z.lazy(() => userSchemaRes.extend(userRelations()))
export type UserResRelated = z.infer<typeof userSchemaResRelated>

/** Response with users (default) */
export const userSchemaResList = listSchema(userSchemaRes)
export type UserResList = z.infer<typeof userSchemaResList>

/** Response with users (related) */
export const userSchemaResListRelated = listSchema(userSchemaResRelated)
export type UserResListRelated = z.infer<typeof userSchemaResListRelated>

/** Requests with pagination */
export const userSchemaPagi = pagiSchema(filterKeys)
export type UserPagi = z.infer<typeof userSchemaPagi>

/** Requests for search */
export const userSchemaFilter =
  filterSchema(filterKeys, userSchema.shape).merge(userSchemaPagi)
export type UserFilter = z.infer<typeof userSchemaFilter>

/** Requests for password modification */
export const passwdSchema = z.object({password: userSchema.shape.password})
export type Password = z.infer<typeof passwdSchema>

/** Requests for login */
export const credentialSchema =
  passwdSchema.extend({username: userSchema.shape.username})
export type Credential = z.infer<typeof credentialSchema>
