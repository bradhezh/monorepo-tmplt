import {diaries, DiaryData, Diary, DiaryNonSensitive} from '@/data/diaries'

export const get = (): Diary[] => {
  return diaries
}

export const getNonSensitive = (): DiaryNonSensitive[] => {
  return diaries.map(({comment: _comment, ...rest}) => rest)
}

export const getById = (id: number): DiaryNonSensitive | undefined => {
  const diary = diaries.find(e => e.id === id)
  if (!diary) {
    return
  }
  return (({comment: _comment, ...rest}) => rest)(diary)
}

export const create = (data: DiaryData): Diary => {
  const diary = {id: Math.max(...diaries.map(e => e.id)) + 1, ...data}
  diaries.push(diary)
  return diary
}

export default {get, getNonSensitive, getById, create}
