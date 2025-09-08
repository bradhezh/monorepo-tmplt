import supertest from 'supertest'
import TestAgent from 'supertest/lib/agent'

import {HTTP_STATUS} from '@/const'
import conf from '@/conf'
import usersSvc from '@/services/users'
import profsSvc from '@/services/profiles'
import rolesSvc from '@/services/roles'
import itemsSvc from '@/services/items'
import {app, prisma} from '@/app'

const admin = {
  username: 'admin',
  password: '888888',
  email: 'admin@mail.com',
}

const brad = {
  username: 'brad',
  password: 'abcd12',
  email: 'brad@mail.com',
  profile: {
    name: 'Brad Hezh',
  },
}

let api: TestAgent

describe('app', () => {
  beforeAll(async () => {
    api = supertest(app)
    await usersSvc.rmBulk()
    await profsSvc.rmBulk()
    await rolesSvc.rmBulk()
    await itemsSvc.rmBulk()

    for (const role of conf.ROLES) {
      await rolesSvc.create({name: role})
    }
    await usersSvc.create(admin, undefined, [{name: conf.ROLE.ADMIN}])
  }, 20000)

  describe('signup', () => {
    it('with profile', async () => {
      const res = await api.post(`${conf.USERS_EP}${conf.SIGNUP}`).send({
        user: brad,
        profile: brad.profile,
        includes: ['profile', 'roles'],
      }).expect(HTTP_STATUS.CREATED).expect('Content-Type', /application\/json/)

      const {
        id: _i, createdAt: _c, updatedAt: _u,
        profile: {id: _i1, createdAt: _c1, updatedAt: _u1, ...profData},
        roles: _r,
        ...userData
      } = res.body
      expect(userData)
        .toEqual((({password: _p, profile: _f, ...rest}) => rest)(brad))
      expect(profData).toEqual({...brad.profile, username: brad.username})
      expect(res.body.roles.length).toBe(1)
      expect(res.body.roles[0].name).toBe(conf.ROLE_DEF)

      const profile = await profsSvc.getUnique({id: res.body.profile.id})
      expect(res.body.profile).toEqual(JSON.parse(JSON.stringify(profile)))
      const roles = await rolesSvc.search({}, {id: res.body.id})
      expect(res.body.roles).toEqual(JSON.parse(JSON.stringify(roles)))
      const user =
        await usersSvc.getUnique({id: res.body.id}, ['profile', 'roles'])
      expect(res.body).toEqual(JSON.parse(JSON.stringify(user)))
    })
  })

  describe('items', () => {
    it('create', async () => {
    })
    it('update', async () => {
    })
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })
})
