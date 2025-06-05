import {DiaryData} from '@/data/diaries'

declare global {
  namespace Express {
    interface Request {
      validatedBody?: DiaryData
    }
  }
}
