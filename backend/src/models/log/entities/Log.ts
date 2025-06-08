import {
  Entity, PrimaryKey, SerializedPrimaryKey, Property, ObjectId,
} from '@mikro-orm/mongodb'

@Entity()
export class Log {
  @PrimaryKey()
  _id!: ObjectId

  @SerializedPrimaryKey()
  id!: string

  @Property()
  timestamp? = new Date()

  @Property()
  type!: string

  @Property()
  message!: string
}
