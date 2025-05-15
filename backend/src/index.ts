import {app, init} from '@backend/app'
import conf from '@backend/conf'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
  try {
    await init()
    app.listen(conf.PORT, () => {
      console.log(`Server running on port ${conf.PORT}`)
    })
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.name, err.message)
    }
  }
})()
