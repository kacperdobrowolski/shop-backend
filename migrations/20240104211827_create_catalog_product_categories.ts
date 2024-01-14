import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('catalog_product_categories', (table) => {
    table.bigInteger('productId').notNullable().unsigned().references('id').inTable('catalog_products').onDelete('CASCADE');
    table.bigInteger('categoryId').notNullable().unsigned().references('id').inTable('catalog_categories').onDelete('CASCADE');

    table.primary(['productId', 'categoryId']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('catalog_product_categories');
}
