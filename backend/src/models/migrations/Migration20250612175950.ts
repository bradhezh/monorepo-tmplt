import {Migration} from '@mikro-orm/migrations';

import conf from '@/conf'

export class Migration20250612175950 extends Migration {

  override async up(): Promise<void> {
    await conf.cryptAdminPasswd()

    this.addSql(`alter table "item" alter column "price" type numeric(10,2) using ("price"::numeric(10,2));`);

    this.addSql(`
      insert into "user" (username, password, created_at, updated_at)
      values ('${conf.INI_ADMIN}', '${conf.INI_ADMIN_PASSWD}', now(), now())`)
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "item" alter column "price" type int using ("price"::int);`);
  }

}
