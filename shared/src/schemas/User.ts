import {z} from 'zod'

import {MESSAGE} from '@shared/const'
import conf from '@shared/conf'
import {createdAtSchema, pagiSchema, listSchema} from '@shared/schemas/base'

export enum UserPropFilter {
  Username = 'username',
  Name = 'name',
  Email = 'email',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
}

/** Requests for password modification */
export const passwdSchema = z.object({
  password: z.string().min(conf.PASSWD_MIN).max(conf.PASSWD_MAX)
    .regex(/[A-Za-z]/, {message: MESSAGE.INV_PASSWD_LETTER_REQUIRED})
    .regex(/[0-9]/, {message: MESSAGE.INV_PASSWD_NUM_REQUIRED})
})
export type Password = z.infer<typeof passwdSchema>

/** Requests for login */
export const credentialSchema = passwdSchema.extend({
  username: z.string().min(conf.USERNAME_MIN).max(conf.USERNAME_MAX)
    .regex(/^[a-zA-Z][a-zA-Z0-9_]*$/, {message: MESSAGE.INV_USERNAME}),
})
export type Credential = z.infer<typeof credentialSchema>

/** Requests for creation */
export const userSchemaData = credentialSchema.extend({
  name: z.string().max(conf.NAME_MAX)
    .regex(/^[a-zA-Z\s-]*$/, {message: MESSAGE.INV_NAME}).optional(),
  email: z.string().email().optional(),
})
export type UserData = z.infer<typeof userSchemaData>

/** Requests for update */
export const userSchemaDataOpt = userSchemaData.partial()
export type UserDataOpt = z.infer<typeof userSchemaDataOpt>

/** Requests with pagination */
export const userSchemaPagi = pagiSchema(UserPropFilter)
export type UserPagi = z.infer<typeof userSchemaPagi>

/** Requests for search */
export const userSchemaFilter = userSchemaData.omit({password: true})
  .partial().merge(userSchemaPagi).and(createdAtSchema)
export type UserFilter = z.infer<typeof userSchemaFilter>

/** Response with one user */
export const userSchema = userSchemaData.omit({password: true}).extend({
  id: z.number().int().positive(),
})
export type UserType = z.infer<typeof userSchema>

/** Response with users */
export const usersSchema = listSchema(userSchema)
export type Users = z.infer<typeof usersSchema>
