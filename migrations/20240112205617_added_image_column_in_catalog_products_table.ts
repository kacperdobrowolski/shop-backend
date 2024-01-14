import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('catalog_products', (table) => {
    table.string('image').nullable().after('description');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('catalog_products', (table) => {
    table.dropColumn('image');
  });
}