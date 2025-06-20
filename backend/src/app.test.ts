import supertest from 'supertest'
import TestAgent from 'supertest/lib/agent'

import {HTTP_STATUS} from '@/const'
import conf from '@/conf'
import {ItemCategory} from '@shared/schemas'
import {Item} from '@/models/entities'
import {DI, app, init} from './app'

const items = [{
  name: 'test item 1',
  category: ItemCategory.Book,
  price: 100,
  stock: 10,
}, {
  name: 'test item 2',
  category: ItemCategory.Electronics,
  price: 200,
  stock: 20,
}]

let api: TestAgent

describe('app', () => {
  beforeAll(async () => {
    await init()
    api = supertest(app)

    const em = DI.getEm().fork()
    await em.nativeDelete(Item, {})
    for (const item of items) {
      em.create(Item, item)
    }
    await em.flush()

    console.log('Before tests.')
  })

  describe('version', () => {
    it('get', async () => {
      const res = await api.get(conf.VER_EP)
        .expect(HTTP_STATUS.OK).expect('Content-Type', /application\/json/)
      expect(res.body).toEqual(conf.VERSION)
    })
  })

  afterAll(async () => {
    await DI.db?.close()
    console.log('After tests.')
  })
})
