import {PrimaryKey, Property} from '@mikro-orm/core'

export abstract class Base {
  // values of the numeric primary key can be auto-generated from the db
  // (autoincrement), unless "autoincrement: false" is specified
  @PrimaryKey()
  // can be from the db and then optional in em.create(...)
  id!: number

  @Property({
    // lazy: being excluded in queries by default; can be included via
    // populating (em.populate(item, ['lazy_prop_name']))
    lazy: true,
    // hidden: hidden in serialisation (JSON)
    hidden: true,
    onCreate: () => new Date(),
  })
  // optional in em.create(...)
  createdAt?: Date

  @Property({
    lazy: true,
    hidden: true,
    onCreate: () => new Date(),
    onUpdate: () => new Date(),
  })
  updatedAt?: Date
}
