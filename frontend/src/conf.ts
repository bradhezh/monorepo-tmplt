import common from '@shared/conf'

const conf = {
  ...common,

  // injected by Vite
  ENV: import.meta.env,
} as const

export default conf
