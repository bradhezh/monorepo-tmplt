import {describe, test, before, after} from 'node:test'
import assert from 'node:assert'
import supertest from 'supertest'
import TestAgent from 'supertest/lib/agent'

import {HTTP_STATUS} from '@backend/const'
import conf from '@backend/conf'
import app from './app'

let api: TestAgent

void describe('app', () => {
  before(() => {
    api = supertest(app)
    console.log('Before tests.')
  })

  void describe('version', () => {
    void test('get', async () => {
      const res = await api.get(conf.VER_EP)
        .expect(HTTP_STATUS.OK).expect('Content-Type', /application\/json/)
      assert.strictEqual(res.body, conf.VERSION)
    })
  })

  after(() => {
    console.log('After tests.')
  })
})
