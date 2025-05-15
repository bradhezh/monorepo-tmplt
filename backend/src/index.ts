import app from '@backend/app'
import conf from '@backend/conf'

app.listen(conf.PORT, () => {
  console.log(`Server running on port ${conf.PORT}`)
})
