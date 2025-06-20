import { Migration } from '@mikro-orm/migrations';

export class Migration20250611130542 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`drop table if exists "item_a" cascade;`);

    this.addSql(`drop table if exists "item_b" cascade;`);

    this.addSql(`alter table "user" add column "email" varchar(255) null;`);

    this.addSql(`alter table "item" add column "category" varchar(255) not null, add column "price" int not null, add column "stock" int not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`create table "item_a" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null);`);
    this.addSql(`alter table "item_a" add constraint "item_a_name_unique" unique ("name");`);

    this.addSql(`create table "item_b" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null);`);
    this.addSql(`alter table "item_b" add constraint "item_b_name_unique" unique ("name");`);

    this.addSql(`alter table "user" drop column "email";`);

    this.addSql(`alter table "item" drop column "category", drop column "price", drop column "stock";`);
  }

}
