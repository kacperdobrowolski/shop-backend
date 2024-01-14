import { Module } from '@nestjs/common';
import { UserSettingController } from './user-setting.controller';
import { UserSettingService } from './user-setting.service';
import { UserRepository } from './user.repository';
import { ShippingAddressModule } from './shipping-address/shipping-address.module';
import { BillingAddressModule } from './billing-address/billing-address.module';

@Module({
  imports: [
    ShippingAddressModule,
    BillingAddressModule,
  ],
  controllers: [UserSettingController],
  providers: [
    UserSettingService,
    UserRepository,
  ],
})
export class UserSettingModule {}