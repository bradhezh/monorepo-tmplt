import {z} from 'zod'

import {pagiSchema, filterSchema, listSchema} from '@shared/schemas/base'
import {itemSchemaRes} from '@shared/schemas'
import {userSchema} from '@shared/schemas/prisma'

const autos = ['id', 'created_at', 'updated_at'] as const
export const userExcludes = ['password'] as const
export const userOrderBy = 'username' as const
export const userRelations = () => {return {items: itemSchemaRes.array()}}

const filterKeys = Object.keys(userSchema.shape).filter(
  e => !userExcludes.includes(e as typeof userExcludes[number]))

/** Zod schema for the creation request body. */
export const userSchemaData = userSchema.omit(Object.fromEntries(
  autos.map(e => [e, true])) as {[E in typeof autos[number]]: true})
/** Type of the creation request body. */
export type UserData = z.infer<typeof userSchemaData>

/** Zod schema for the updating request body. */
export const userSchemaDataOpt = userSchemaData.partial().omit(
  Object.fromEntries(userExcludes.map(e => [e, true])) as {
    [E in typeof userExcludes[number]]: true
  })
/** Type of the updating request body. */
export type UserDataOpt = z.infer<typeof userSchemaDataOpt>

/** Zod schema for the response with one user (without relations). */
export const userSchemaRes = userSchema.omit(Object.fromEntries(
  userExcludes.map(e => [e, true])) as {
    [E in typeof userExcludes[number]]: true
  })
/** Type of the response with one user (without relations). */
export type UserRes = z.infer<typeof userSchemaRes>

/** Zod schema for the response with one user (with relations). */
export const userSchemaResRelated =
  z.lazy(() => userSchemaRes.extend(userRelations()))
/** Type of the response with one user (with relations). */
export type UserResRelated = z.infer<typeof userSchemaResRelated>

/** Zod schema for the response with multiple users (without relations). */
export const userSchemaResList = listSchema(userSchemaRes)
/** Type of the response with multiple users (without relations). */
export type UserResList = z.infer<typeof userSchemaResList>

/** Zod schema for the response with multiple users (with relations). */
export const userSchemaResListRelated = listSchema(userSchemaResRelated)
/** Type of the response with multiple users (with relations). */
export type UserResListRelated = z.infer<typeof userSchemaResListRelated>

/** Zod schema for pagination, in the request body or query string. */
export const userSchemaPagi = pagiSchema(filterKeys)
/** Type of pagination, from the request body or query string. */
export type UserPagi = z.infer<typeof userSchemaPagi>

/** Zod schema for the search request body. */
export const userSchemaFilter =
  filterSchema(filterKeys, userSchema.shape).merge(userSchemaPagi)
/** Type of the search request body. */
export type UserFilter = z.infer<typeof userSchemaFilter>

/** Zod schema for the password modification request body. */
export const passwdSchema = z.object({password: userSchema.shape.password})
/** Type of the password modification request body. */
export type Password = z.infer<typeof passwdSchema>

/** Zod schema for the login request body. */
export const credentialSchema =
  passwdSchema.extend({username: userSchema.shape.username})
/** Type of the login request body. */
export type Credential = z.infer<typeof credentialSchema>
