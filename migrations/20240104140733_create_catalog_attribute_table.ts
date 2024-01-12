
import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('catalog_attributes', (table) => {
    table.bigIncrements('id');
    table.string('name').notNullable().unique();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('catalog_attributes');
}
