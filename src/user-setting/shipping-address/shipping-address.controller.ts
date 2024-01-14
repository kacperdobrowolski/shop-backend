import { Body, Controller, Delete, ForbiddenException, NotFoundException, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { AddAddressDto } from './dto/add-address.dto';
import { AuthedUser } from 'src/auth/user.decorator';
import { ShippingAddressService } from './shipping-address.service';
import { AddressNotFoundException } from './exceptions/address-not-found.exception';
import { AddressNotAllowedException } from './exceptions/address-not-allowed.exception';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('user-setting/shipping-address')
export class ShippingAddressController {
  constructor(
    private readonly shippingAddressService: ShippingAddressService,
  ) {}

  @Post()
  async add(
    @AuthedUser() user: any,
    @Body() address: AddAddressDto,
  ): Promise<void> {
    await this.shippingAddressService.add({
      userId: user.id,
      ...address,
    });
  }

  @Delete(':id')
  async delete(
    @AuthedUser() user: any,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    try {
      await this.shippingAddressService.delete(id, user.id);
    } catch (error) {
      switch (error.constructor) {
        case AddressNotFoundException:
          throw new NotFoundException('Nie znaleziono adresu');

        case AddressNotAllowedException:
          throw new ForbiddenException('Adres nie nalezy do podanego uzytkownika');

        default:
          throw error;
      }
    }
  }

  @Patch(':id')
  async update(
    @AuthedUser() user: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() address: UpdateAddressDto,
  ): Promise<void> {
    try {
      await this.shippingAddressService.update({
        id,
        userId: user.id,
        ...address,
      });
    } catch (error) {
      switch (error.constructor) {
        case AddressNotFoundException:
          throw new NotFoundException('Nie znaleziono adresu');

        case AddressNotAllowedException:
          throw new ForbiddenException('Adres nie nalezy do podanego uzytkownika');

        default:
          throw error;
      }
    }
  }
}