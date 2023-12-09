import { Body, Controller, Delete, Param, ParseIntPipe, Post, Query, Get, Patch } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { GetProductsDto } from './dto/get-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('admin/catalog/product')
export class ProductController {
  constructor(
    @InjectKnex() private readonly db: Knex,
    private readonly productService: ProductService,
  ) {}

  @Post()
  async createProduct(
    @Body() {
      name,
      price,
      description,
    }: CreateProductDto,
  ): Promise<void> {
    await this.productService.createProduct(
      name,
      price,
      description,
    );
  }

  @Delete(':id')
  async deleteProduct(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.productService.deleteProduct(id);
  }

  @Get()
  async getProducts(
    @Query() {
      page,
      name,
    }: GetProductsDto,
  ): Promise<Record<string, any>> {
    const query = this.db('catalog_products');

    if (name) {
      query.where('name', 'like', `%${name}%`);
    }

    const total = +(await query.clone().count().first())['count(*)'];
    const perPage = 100;
    const maxPage = Math.ceil(total / perPage);
    const currentPage = +page || 1;

    const products = await query
      .orderBy('createdAt', 'desc')
      .offset(currentPage * perPage - perPage)
      .limit(perPage);

    return {
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      })),

      pagination: {
        total,
        currentPage,
        perPage,
        maxPage,
      },
    };
  }

  @Patch(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() {
      name,
      price,
      description,
    }: UpdateProductDto,
  ): Promise<void> {
    await this.productService.updateProduct(
      id,
      name,
      price,
      description,
    );
  }
}
