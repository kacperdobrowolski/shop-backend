import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('catalog_product_attributes', (table) => {
    table.bigInteger('productId').notNullable().unsigned().references('id').inTable('catalog_products').onDelete('CASCADE');
    table.bigInteger('attributeValueId').notNullable().unsigned().references('id').inTable('catalog_attribute_values').onDelete('CASCADE');

    table.primary(['productId', 'attributeValueId']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('catalog_product_attributes');
}
