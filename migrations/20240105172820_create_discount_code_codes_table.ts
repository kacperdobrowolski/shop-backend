import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('discount_code_codes', (table) => {
    table.bigIncrements('id');
    table.string('name', 32).notNullable();
    table.integer('discountPercent').notNullable().unsigned();
    table.integer('numberOfUses').nullable();
    table.dateTime('expiresAt').nullable();
    table.dateTime('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.dateTime('updatedAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

    table.unique('name');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('discount_code_codes');
}
