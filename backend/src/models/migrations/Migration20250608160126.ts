/* eslint-disable @typescript-eslint/require-await */
import {Migration} from '@mikro-orm/migrations';

import conf from '@/conf'

export class Migration20250608160126 extends Migration {

  override async up(): Promise<void> {
    await conf.cryptAdminPasswd()

    this.addSql(`alter table "user" drop constraint "user_name_unique";`);

    this.addSql(`alter table "user" add column "username" varchar(255) not null;`);
    this.addSql(`alter table "user" alter column "name" type varchar(255) using ("name"::varchar(255));`);
    this.addSql(`alter table "user" alter column "name" drop not null;`);
    this.addSql(`alter table "user" add constraint "user_username_unique" unique ("username");`);

    this.addSql(`
      insert into "user" (username, password, created_at, updated_at)
      values ('${conf.INI_ADMIN}', '${conf.INI_ADMIN_PASSWD}', now(), now())`)
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" drop constraint "user_username_unique";`);
    this.addSql(`alter table "user" drop column "username";`);

    this.addSql(`alter table "user" alter column "name" type varchar(255) using ("name"::varchar(255));`);
    this.addSql(`alter table "user" alter column "name" set not null;`);
    this.addSql(`alter table "user" add constraint "user_name_unique" unique ("name");`);
  }

}
