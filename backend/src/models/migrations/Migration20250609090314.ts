import { Migration } from '@mikro-orm/migrations';

export class Migration20250609090314 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "user" alter column "password" drop default;`);
    this.addSql(`alter table "user" alter column "password" type varchar(255) using ("password"::varchar(255));`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" alter column "password" type varchar(255) using ("password"::varchar(255));`);
    this.addSql(`alter table "user" alter column "password" set default '';`);
  }

}
