import { Module } from '@nestjs/common';
import { BillingAddressController } from './billing-address.controller';
import { BillingAddressService } from './billing-address.service';
import { BillingAddressRepository } from './billing-address.repository';

@Module({
  controllers: [BillingAddressController],
  providers: [
    BillingAddressService,
    BillingAddressRepository,
  ],
})
export class BillingAddressModule {}