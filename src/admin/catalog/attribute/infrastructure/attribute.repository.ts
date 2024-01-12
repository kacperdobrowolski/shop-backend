import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { AttributeAlreadyExistException } from '../exceptions/attribute-already-exist.exception';

@Injectable()
export class AttributeRepository {
  constructor(
    @InjectKnex() private readonly db: Knex,
  ) {}

  async create(name: string): Promise<void> {
    try {
      await this.db('catalog_attributes')
        .insert({ name });
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new AttributeAlreadyExistException();
      }

      throw error;
    }
  }

  async findOneById(id: number): Promise<{ id: number }> {
    return await this.db('catalog_attributes')
      .select('id')
      .where('id', id)
      .first();
  }

  async delete(attributeId: number): Promise<void> {
    await this.db('catalog_attributes')
      .where('id', attributeId)
      .del();
  }
}