import {PrimaryKey, Property} from '@mikro-orm/core'

export abstract class Base {
  @PrimaryKey()
  // here "!" means it will be from the db and optional in em.create(...)
  id!: number

  @Property({lazy: true, hidden: true})
  // here "?" means being optional in em.create(...)
  createdAt? = new Date()

  @Property({lazy: true, hidden: true, onUpdate: () => new Date()})
  updatedAt? = new Date()
}
