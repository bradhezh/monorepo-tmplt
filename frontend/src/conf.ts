import common from '@shared/conf'

const conf = {
  ...common,

  // injected by Vite
  ENV: import.meta.env,
}

export default conf
