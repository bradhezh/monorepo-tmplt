import supertest from 'supertest'
import TestAgent from 'supertest/lib/agent'

import {HTTP_STATUS} from '@/const'
import conf from '@/conf'
import {app, prisma} from './app'

const items = [{
  name: 'test item 1',
  category: 'BOOK',
  price: 100,
  stock: 10,
}, {
  name: 'test item 2',
  category: 'ELECTRONICS',
  price: 200,
  stock: 20,
}]

let api: TestAgent

describe('app', () => {
  beforeAll(async () => {
    api = supertest(app)

    await prisma.item.deleteMany()
    for (const item of items) {
      await prisma.item.create({data: item})
    }
  })

  describe('version', () => {
    it('get', async () => {
      const res = await api.get(conf.VER_EP)
        .expect(HTTP_STATUS.OK).expect('Content-Type', /application\/json/)
      expect(res.body).toEqual(conf.VERSION)
    })
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })
})
