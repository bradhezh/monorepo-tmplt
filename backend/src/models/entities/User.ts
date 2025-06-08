import {Entity, Property, Unique, OneToMany, Collection} from '@mikro-orm/core'

import {Base} from './Base'
import {Item} from './Item'

@Entity()
export class User extends Base {
  @Property() @Unique()
  username!: string

  @Property({nullable: true})
  name?: string

  @Property({lazy: true, hidden: true})
  password? = ''

  @OneToMany(() => Item, item => item.user)
  items = new Collection<Item>(this)
}
