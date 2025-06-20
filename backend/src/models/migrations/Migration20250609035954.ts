import { Migration } from '@mikro-orm/migrations';

export class Migration20250609035954 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "item_a" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null);`);
    this.addSql(`alter table "item_a" add constraint "item_a_name_unique" unique ("name");`);

    this.addSql(`create table "item_b" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null);`);
    this.addSql(`alter table "item_b" add constraint "item_b_name_unique" unique ("name");`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "item_a" cascade;`);

    this.addSql(`drop table if exists "item_b" cascade;`);
  }

}
