import {DiaryData} from '@backend/data/diaries'

declare global {
  namespace Express {
    interface Request {
      validatedBody?: DiaryData
    }
  }
}
