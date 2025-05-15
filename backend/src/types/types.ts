import {z} from 'zod'

export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Windy = 'windy',
  Stormy = 'stormy',
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

export const DiarySchema = z.object({
  date: z.string().date(),
  weather: z.nativeEnum(Weather),
  visibility: z.nativeEnum(Visibility),
  comment: z.string().optional(),
})
// ts types can be inferred from schemas
export type DiaryData = z.infer<typeof DiarySchema>
export interface Diary extends DiaryData {
  id: number
}
export type DiaryNonSensitive = Omit<Diary, 'comment'>
