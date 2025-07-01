import {Entity, Property, Unique, ManyToOne} from '@mikro-orm/core'

import {ItemCategory} from '@shared/schemas'
import {Base} from './Base'
import {User} from './User'

@Entity()
export class Item extends Base {
  @Property() @Unique()
  // must be from `em.create(...)`
  name!: string

  @Property({type: 'string'})
  category!: ItemCategory

  @Property({
    type: 'decimal',
    scale: 2,
  })
  price!: number

  @Property()
  stock!: number

  // owning side (by default)
  @ManyToOne(() => User, {nullable: true})
  user?: User
}
