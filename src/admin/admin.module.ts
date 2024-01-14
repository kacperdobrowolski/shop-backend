import { Module } from '@nestjs/common';
import { CatalogModule } from './catalog/catalog.module';
import { DiscountCodeModule } from './discount-code/discount-code.module';

@Module({
  imports: [
    CatalogModule,
    DiscountCodeModule,
  ],
})
export class AdminModule {}
