import { Migration } from '@mikro-orm/migrations';

export class Migration20250612175952 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "item" alter column "price" type numeric(10,2) using ("price"::numeric(10,2));`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "item" alter column "price" type int using ("price"::int);`);
  }

}
