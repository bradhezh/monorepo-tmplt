export const ENV = {
  PROD: 'production',
  DBG: 'debug',
  DEV: 'development',
  TEST: 'test',
} as const

export const MESSAGE = {
  INV_USERNAME: 'Username must start with a letter and contain only letters, numbers, or underscores.',
  INV_NAME: 'Name may contain only letters, spaces, and hyphens.',
  INV_PASSWD_LETTER_REQUIRED: 'Password must include letters.',
  INV_PASSWD_NUM_REQUIRED: 'Password must include numbers.',
  INV_CREATEDAT: 'createdAtMin cannot be after than createdAtMax.',
  INV_PRICE: 'priceMin cannot be greater than priceMax.',
  INV_STOCK: 'stockMin cannot be greater than stockMax.',
} as const
