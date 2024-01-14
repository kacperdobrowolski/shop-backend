import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { IBillingAddress } from './interfaces/billing-address.interface';

@Injectable()
export class BillingAddressRepository {
  constructor(
    @InjectKnex() private readonly db: Knex,
  ) {}

  async create(data: Omit<IBillingAddress, 'id'>): Promise<void> {
    await this.db('user_billing_addresses')
      .insert({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
  }

  async delete(id: number): Promise<void> {
    await this.db('user_billing_addresses')
      .where('id', id)
      .del();
  }

  async findOneById(id: number): Promise<IBillingAddress> {
    return await this.db('user_billing_addresses')
      .select(
        'id',
        'userId',
        'firstName',
        'lastName',
        'street',
        'houseNumber',
        'apartmentNumber',
        'zipCode',
        'place',
        'country',
      )
      .where('id', id)
      .first();
  }

  async persist(data: IBillingAddress): Promise<void> {
    await this.db('user_billing_addresses')
      .where('id', data.id)
      .update(data);
  }
}