import {default as express, Response} from 'express'

import {Diary, DiaryNonSensitive} from '@backend/data/diaries'
import {diaryParser} from '@backend/utils/middleware'
import diaries from '@backend/services/diaries'

const router = express.Router()

router.get('/', (_req, res: Response<DiaryNonSensitive[]>) => {
  //const data = diaries.get()
  const data = diaries.getNonSensitive()
  res.json(data)
})

// although annotated as Response<DiaryNonSensitive>, res.json is under the hood
// typed to accept "any", so it's just a hint
router.get('/id/:id', (req, res: Response<DiaryNonSensitive>) => {
  const diary = diaries.getById(Number(req.params.id))
  if (!diary) {
    return res.status(404).end()
  }
  return res.json(diary)
})

router.post('/', diaryParser, (req, res: Response<Diary>) => {
  const diary = diaries.create(req.validatedBody!)
  res.status(201).json(diary)
})

export default router
