import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';

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
}