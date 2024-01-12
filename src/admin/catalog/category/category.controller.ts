import { Body, ConflictException, Controller, Delete, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CategoryAlreadyExistException } from './exceptions/category-already-exist.exception';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryService } from './category.service';

@Controller('admin/catalog/category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
  ) {}

  @Post()
  async createCategory(
    @Body() { name }: CreateCategoryDto,
  ): Promise<void> {
    try {
      await this.categoryService.createCategory(name);
    } catch (error) {
      if (error.constructor === CategoryAlreadyExistException) {
        throw new ConflictException('Taka kategoria juz istnieje');
      }

      throw error;
    }
  }

  @Delete(':id')
  async deleteCategory(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.categoryService.deleteCategory(id);
  }
}