import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { AttributeValueAlreadyExistException } from '../exceptions/attribute-value-already-exist.exception';
import { IAttributeValue } from '../interfaces/attribute-value.interface';

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

  async findOneById(id: number): Promise<IAttributeValue> {
    return this.db('catalog_attribute_values')
      .select('id', 'value')
      .where('id', id)
      .first();
  }

  async persist(attributeValue: IAttributeValue): Promise<void> {
    await this.db('catalog_attribute_values')
      .where('id', attributeValue.id)
      .update({ value: attributeValue.value });
  }
}