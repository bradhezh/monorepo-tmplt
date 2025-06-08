import {z} from 'zod'

export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Windy = 'windy',
  Stormy = 'stormy',
}

export const DiarySchema = z.object({
  date: z.string().date(),
  weather: z.nativeEnum(Weather),
  comment: z.string().optional(),
})
// ts types can be inferred from schemas
export type DiaryData = z.infer<typeof DiarySchema>
export interface Diary extends DiaryData {
  id: number
}
export type DiaryNonSensitive = Omit<Diary, 'comment'>

const data = [{
  "id": 1,
  "date": "2017-01-01",
  "weather": "rainy",
  "comment": "Pretty scary flight, I'm glad I'm alive"
}, {
  "id": 2,
  "date": "2017-04-01",
  "weather": "sunny",
  "comment": "Everything went better than expected, I'm learning much"
}, {
  "id": 3,
  "date": "2017-04-15",
  "weather": "windy",
  "comment": "I'm getting pretty confident although I hit a flock of birds"
}, {
  "id": 4,
  "date": "2017-05-11",
  "weather": "cloudy",
  "comment": "I almost failed the landing but I survived"
}]

export const diaries: Diary[] = data.map((e) => {
  return {id: e.id, ...DiarySchema.parse(e)}
})
