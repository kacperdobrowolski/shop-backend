import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { IShippingAddress } from './interfaces/shipping-address.interface';

@Injectable()
export class ShippingAddressRepository {
  constructor(
    @InjectKnex() private readonly db: Knex,
  ) {}

  async create(data: Omit<IShippingAddress, 'id'>): Promise<void> {
    await this.db('user_shipping_addresses')
      .insert({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
  }

  async delete(id: number): Promise<void> {
    await this.db('user_shipping_addresses')
      .where('id', id)
      .del();
  }

  async findOneById(id: number): Promise<IShippingAddress> {
    return await this.db('user_shipping_addresses')
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

  async persist(data: IShippingAddress): Promise<void> {
    await this.db('user_shipping_addresses')
      .where('id', data.id)
      .update(data);
  }
}