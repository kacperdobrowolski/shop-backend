import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { IProduct } from './interfaces/product.interface';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
  ) {}

  async createProduct(product: IProduct): Promise<void> {
    await this.productRepository.createOrUpdate(product);
  }

  async deleteProduct(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }

  async updateProduct(product: IProduct): Promise<void> {
    await this.productRepository.createOrUpdate(product);
  }
}
