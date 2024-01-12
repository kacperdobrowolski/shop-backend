import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { AttributeModule } from './attribute/attribute.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ProductModule,
    AttributeModule,
    CategoryModule,
  ],
})
export class CatalogModule {}
