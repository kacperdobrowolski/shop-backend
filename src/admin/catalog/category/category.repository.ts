import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { CategoryAlreadyExistException } from './exceptions/category-already-exist.exception';
import { ICategory } from './interfaces/category.interface';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectKnex() private readonly db: Knex,
  ) {}

  async create(name: string): Promise<void> {
    try {
      await this.db('catalog_categories')
        .insert({ name });
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new CategoryAlreadyExistException();
      }

      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    await this.db('catalog_categories')
      .where('id', id)
      .del();
  }

  async findOneById(id: number): Promise<ICategory> {
    return this.db('catalog_categories')
      .select('id', 'name')
      .where('id', id)
      .first();
  }

  async persist(category: ICategory): Promise<void> {
    await this.db('catalog_categories')
      .where('id', category.id)
      .update({ name: category.name });
  }
}