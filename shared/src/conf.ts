// only for "import" in prisma schemas, not used in src code
export * from '@shared/const'

const conf = {
  ITEMS_EP: '/api/items',
  USERS_EP: '/api/users',
  BY_ID: '/id/:id',
  BY_NAME: '/name/:name',
  SEARCH: '/search',

  PAGE_DEF: 20,
  PAGE_MAX: 100,

  NAME_MAX: 50,
  USERNAME_MIN: 3,
  USERNAME_MAX: 20,
  PASSWD_MIN: 6,
  PASSWD_MAX: 20,
} as const

export default conf
