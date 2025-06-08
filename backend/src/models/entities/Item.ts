import {Entity, Property, Unique, ManyToOne} from '@mikro-orm/core'

import {Base} from './Base'
import {User} from './User'

@Entity()
export class Item extends Base {
  @Property() @Unique()
  // here "!" means it must be from em.create(...)
  name!: string

  @ManyToOne(() => User, {nullable: true})
  user?: User
}
