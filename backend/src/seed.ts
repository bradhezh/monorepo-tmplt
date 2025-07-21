import {PrismaClient} from '@PrismaClient/.'
import {withAccelerate} from '@prisma/extension-accelerate'
import bcrypt from 'bcrypt'

import conf from '@/conf'

const prisma = new PrismaClient().$extends(withAccelerate())

void (async () => {
  try {
    const password = await bcrypt.hash(conf.INI_ADMIN_PASSWD, conf.SALT)
    await prisma.user.upsert({
      where: {username: conf.INI_ADMIN},
      update: {},
      create: {
        username: conf.INI_ADMIN,
        password,
      },
    })
  } catch (err) {
    console.log(err)

  } finally {
    await prisma.$disconnect()
  }
})()
