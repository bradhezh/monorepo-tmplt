import {default as express, Response} from 'express'

import {HTTP_STATUS} from '@/const'
import conf from '@/conf'
import {MiddlewareErr, diaryParser} from '@/utils/middleware'
import {Diary, DiaryNonSensitive} from '@/data/diaries'
import diaries from '@/services/diaries'

export const router = express.Router()

// annotating res as Response<DiaryNonSensitive[]> turns the param type of
// res.json(...) form "any" to "DiaryNonSensitive[] | undefined"
router.get('/', (_req, res: Response<DiaryNonSensitive[]>) => {
  //const data = diaries.get()
  const data = diaries.getNonSensitive()
  res.json(data)
})

router.get(conf.BY_ID, (req, res: Response<DiaryNonSensitive>) => {
  const diary = diaries.getById(Number(req.params.id))
  if (!diary) {
    throw new MiddlewareErr(HTTP_STATUS.NOT_FOUND)
  }
  res.json(diary)
})

router.post('/', diaryParser, (req, res: Response<Diary>) => {
  const diary = diaries.create(req.validatedBody!)
  res.status(HTTP_STATUS.CREATED).json(diary)
})

export default router
