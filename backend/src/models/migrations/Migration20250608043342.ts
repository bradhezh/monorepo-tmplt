import { Migration } from '@mikro-orm/migrations';

export class Migration20250608043342 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "user" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "password" varchar(255) not null default '');`);
    this.addSql(`alter table "user" add constraint "user_name_unique" unique ("name");`);

    this.addSql(`create table "item" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "user_id" int null);`);
    this.addSql(`alter table "item" add constraint "item_name_unique" unique ("name");`);

    this.addSql(`alter table "item" add constraint "item_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete set null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "item" drop constraint "item_user_id_foreign";`);

    this.addSql(`drop table if exists "user" cascade;`);

    this.addSql(`drop table if exists "item" cascade;`);
  }

}
