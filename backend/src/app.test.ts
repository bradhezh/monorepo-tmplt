import supertest from 'supertest'
import TestAgent from 'supertest/lib/agent'

import {HTTP_STATUS} from '@/const'
import conf from '@/conf'
import {app, init} from './app'

let api: TestAgent

describe('app', () => {
  beforeAll(async () => {
    await init()
    api = supertest(app)
    console.log('Before tests.')
  })

  describe('version', () => {
    it('get', async () => {
      const res = await api.get(conf.VER_EP)
        .expect(HTTP_STATUS.OK).expect('Content-Type', /application\/json/)
      expect(res.body).toEqual(conf.VERSION)
    })
  })

  afterAll(() => {
    console.log('After tests.')
  })
})
