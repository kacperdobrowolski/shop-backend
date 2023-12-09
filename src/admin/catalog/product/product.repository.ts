import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectKnex() private readonly db: Knex,
  ) {}

  async create(
    name: string,
    price: number,
    description: string,
  ): Promise<void> {
    await this.db('catalog_products')
      .insert({
        name,
        price,
        description,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
  }

  async delete(id: number): Promise<void> {
    await this.db('catalog_products')
      .where('id', id)
      .del();
  }

  async persist(
    id: number,
    name: string,
    price: number,
    description: string,
  ): Promise<void> {
    await this.db('catalog_products')
      .update({
        name,
        price,
        description,
      })
      .where('id', id);
  }
}
