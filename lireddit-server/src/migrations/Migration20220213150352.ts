import { Migration } from '@mikro-orm/migrations';

export class Migration20220213150352 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" rename column "_id" to "id";');


    this.addSql('alter table "post" rename column "_id" to "id";');
  }

}
