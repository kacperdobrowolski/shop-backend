import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { IDiscountCode } from './interfaces/discount-code.interface';
import { DiscountCodeAlreadyExistException } from './exceptions/discount-code-already-exist.exception';

@Injectable()
export class DiscountCodeRepository {
  constructor(
    @InjectKnex() private readonly db: Knex,
  ) {}

  async create(
    discountCode: Omit<IDiscountCode, 'id'>,
  ): Promise<void> {
    try {
      await this.db('discount_code_codes')
        .insert({
          name: discountCode.name,
          discountPercent: discountCode.discountPercent,
          numberOfUses: discountCode.numberOfUses,
          expiresAt: discountCode.expiresAt,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new DiscountCodeAlreadyExistException();
      }

      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    await this.db('discount_code_codes')
      .where('id', id)
      .del();
  }

  async persist(discountCode: IDiscountCode): Promise<void> {
    try {
      await this.db('discount_code_codes')
        .where('id', discountCode.id)
        .update({
          name: discountCode.name,
          discountPercent: discountCode.discountPercent,
          numberOfUses: discountCode.numberOfUses,
          expiresAt: discountCode.expiresAt || null,
          updatedAt: new Date(),
        });
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new DiscountCodeAlreadyExistException();
      }

      throw error;
    }
  }

  async findOneById(id: number): Promise<IDiscountCode> {
    return await this.db('discount_code_codes')
      .select(
        'id',
        'name',
        'discountPercent',
        'numberOfUses',
        'expiresAt',
      )
      .where('id', id)
      .first();
  }
}