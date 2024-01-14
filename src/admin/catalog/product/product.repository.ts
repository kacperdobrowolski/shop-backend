import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { IProduct } from './interfaces/product.interface';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectKnex() private readonly db: Knex,
  ) {}

  async createOrUpdate(product: IProduct): Promise<void> {
    const trx = await this.db.transaction();
    let productId = product.id;

    try {
      if (productId) {
        await this.db('catalog_products')
          .where('id', productId)
          .update({
            name: product.name,
            price: product.price,
            description: product.description,
            image: product.image,
            updatedAt: new Date(),
          })
          .transacting(trx);

        await this.db('catalog_product_attributes')
          .where('productId', productId)
          .del()
          .transacting(trx);

        await this.db('catalog_product_categories')
          .where('productId', productId)
          .del()
          .transacting(trx);
      } else {
        const [insertedProductId] = await this.db('catalog_products')
          .insert({
            name: product.name,
            price: product.price,
            description: product.description,
            image: product.image,
            createdAt: new Date(),
            updatedAt: new Date(),
          })
          .transacting(trx);

        productId = insertedProductId;
      }

      if (product.attributeValueIds.length) {
        await this.db('catalog_product_attributes')
          .insert(product.attributeValueIds.map((attributeValueId) => ({
            productId,
            attributeValueId,
          })))
          .transacting(trx);
      }

      if (product.categoryIds.length) {
        await this.db('catalog_product_categories')
          .insert(product.categoryIds.map((categoryId) => ({
            productId,
            categoryId,
          })))
          .transacting(trx);
      }

      await trx.commit();
    } catch (error) {
      await trx.rollback();
      console.error(error);
    }
  }

  async delete(id: number): Promise<void> {
    await this.db('catalog_products')
      .where('id', id)
      .del();
  }
}
