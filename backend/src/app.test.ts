import {describe, test, before, after} from 'node:test'
import assert from 'node:assert'
import supertest from 'supertest'
import TestAgent from 'supertest/lib/agent'

import {conf} from '@backend/conf'
import {app, init} from './app'

let api: TestAgent

// eslint-disable-next-line @typescript-eslint/no-floating-promises
describe('app', () => {
  before(async () => {
    await init()
    api = supertest(app)
    console.log('Before tests.')
  })

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  describe('version', () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    test('get', async () => {
      const res = await api.get(conf.VER_EP)
        .expect(200).expect('Content-Type', /application\/json/)
      assert.strictEqual(res.body, conf.VERSION)
    })
  })

  after(() => {
    console.log('After tests.')
  })
})
