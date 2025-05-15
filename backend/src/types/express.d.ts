import {DiaryData} from './types'

declare global {
  namespace Express {
    interface Request {
      validatedBody?: DiaryData
    }
  }
}
