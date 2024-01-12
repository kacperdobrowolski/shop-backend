import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('catalog_attribute_values', (table) => {
    table.bigIncrements('id');
    table.bigInteger('attributeId').notNullable().unsigned().references('id').inTable('catalog_attributes').onDelete('CASCADE');
    table.string('value').notNullable();

    table.unique(['attributeId', 'value']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('catalog_attribute_values');
}
