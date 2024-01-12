import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { AttributeValueAlreadyExistException } from '../exceptions/attribute-value-already-exist.exception';

@Injectable()
export class AttributeValueRepository {
  constructor(
    @InjectKnex() private readonly db: Knex,
  ) {}

  async create(
    attributeId: number,
    value: string
  ): Promise<void> {
    try {
      await this.db('catalog_attribute_values')
        .insert({
          attributeId,
          value,
        });
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new AttributeValueAlreadyExistException();
      }

      throw error;
    }
  }

  async delete(
    attributeId: number,
    attributeValueId: number,
  ): Promise<void> {
    await this.db('catalog_attribute_values')
      .where('attributeId', attributeId)
      .andWhere('id', attributeValueId)
      .del();
  }
}