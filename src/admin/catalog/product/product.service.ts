import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
  ) {}

  async createProduct(
    name: string,
    price: number,
    description: string,
  ): Promise<void> {
    await this.productRepository.create(
      name,
      price,
      description,
    );
  }

  async deleteProduct(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }

  async updateProduct(
    id: number,
    name: string,
    price: number,
    description: string,
  ): Promise<void> {
    await this.productRepository.persist(
      id,
      name,
      price,
      description,
    );
  }
}
