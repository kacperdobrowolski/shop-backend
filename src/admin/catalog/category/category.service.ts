import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { ICategory } from './interfaces/category.interface';
import { CategoryNotFoundException } from './exceptions/category-not-found.exception';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async createCategory(name: string): Promise<void> {
    await this.categoryRepository.create(name);
  }

  async deleteCategory(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }

  async updateCategory(categoryData: ICategory): Promise<void> {
    const category = await this.categoryRepository.findOneById(categoryData.id);

    if (!category) {
      throw new CategoryNotFoundException();
    }

    category.name = categoryData.name;
    await this.categoryRepository.persist(category);
  }
}