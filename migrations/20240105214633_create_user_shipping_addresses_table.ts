import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('user_shipping_addresses', (table) => {
    table.bigIncrements('id');
    table.bigInteger('userId').notNullable().unsigned().references('id').inTable('user_users').onDelete('CASCADE');
    table.string('firstName').notNullable();
    table.string('lastName').notNullable();
    table.string('street').notNullable();
    table.string('houseNumber').notNullable();
    table.string('apartmentNumber').nullable();
    table.string('zipCode').notNullable();
    table.string('place').notNullable();
    table.string('country').notNullable();
    table.string('phone', 32).notNullable();
    table.dateTime('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.dateTime('updatedAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('user_shipping_addresses');
}
