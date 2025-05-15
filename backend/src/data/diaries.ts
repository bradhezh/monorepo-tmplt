/* eslint-disable quotes */

import {DiarySchema, Diary} from "../types/types"

const data = [{
  "id": 1,
  "date": "2017-01-01",
  "weather": "rainy",
  "visibility": "poor",
  "comment": "Pretty scary flight, I'm glad I'm alive"
}, {
  "id": 2,
  "date": "2017-04-01",
  "weather": "sunny",
  "visibility": "good",
  "comment": "Everything went better than expected, I'm learning much"
}, {
  "id": 3,
  "date": "2017-04-15",
  "weather": "windy",
  "visibility": "good",
  "comment": "I'm getting pretty confident although I hit a flock of birds"
}, {
  "id": 4,
  "date": "2017-05-11",
  "weather": "cloudy",
  "visibility": "good",
  "comment": "I almost failed the landing but I survived"
}]

const diaries: Diary[] = data.map(e => {
  return {id: e.id, ...DiarySchema.parse(e)}
})

export default diaries
