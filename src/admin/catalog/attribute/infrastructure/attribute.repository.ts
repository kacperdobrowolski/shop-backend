import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { AttributeAlreadyExistException } from '../exceptions/attribute-already-exist.exception';
import { IAttribute } from '../interfaces/attribute.interface';

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

  async findOneById(id: number): Promise<IAttribute> {
    return await this.db('catalog_attributes')
      .select('id', 'name')
      .where('id', id)
      .first();
  }

  async delete(attributeId: number): Promise<void> {
    await this.db('catalog_attributes')
      .where('id', attributeId)
      .del();
  }

  async persist(attribute: IAttribute): Promise<void> {
    await this.db('catalog_attributes')
      .where('id', attribute.id)
      .update({ name: attribute.name });
  }
}