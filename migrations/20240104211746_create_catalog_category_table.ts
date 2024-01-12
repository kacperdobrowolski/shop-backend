
import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('catalog_categories', (table) => {
    table.bigIncrements('id');
    table.string('name').notNullable().unique();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('catalog_categories');
}
