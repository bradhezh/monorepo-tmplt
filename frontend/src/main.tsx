import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'

import Main from '@frontend/components/Main'

import conf from '@frontend/conf'
console.log(conf)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Main />
  </StrictMode>,
)
