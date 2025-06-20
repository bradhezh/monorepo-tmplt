import {
  Entity, PrimaryKey, SerializedPrimaryKey, Property, ObjectId,
} from '@mikro-orm/mongodb'

@Entity()
export class Log {
  // the primary key for mongo; (could-be) auto-generated
  @PrimaryKey()
  _id!: ObjectId
  // a virtual property (no such a column in the table, auto-generated) as a
  // string representation of the primary key
  @SerializedPrimaryKey()
  id!: string

  @Property({onCreate: () => new Date()})
  timestamp?: Date

  @Property()
  type!: string

  @Property()
  message!: string
}
