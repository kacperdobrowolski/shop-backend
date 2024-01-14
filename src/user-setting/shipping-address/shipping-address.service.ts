import { Injectable } from '@nestjs/common';
import { ShippingAddressRepository } from './shipping-address.repository';
import { IShippingAddress } from './interfaces/shipping-address.interface';
import { AddressNotFoundException } from './exceptions/address-not-found.exception';
import { AddressNotAllowedException } from './exceptions/address-not-allowed.exception';

@Injectable()
export class ShippingAddressService {
  constructor(
    private readonly shippingAddressRepository: ShippingAddressRepository,
  ) {}

  async add(payload: Omit<IShippingAddress, 'id'>): Promise<void> {
    await this.shippingAddressRepository.create(payload);
  }

  async delete(id: number, userId: number): Promise<void> {
    const address = await this.shippingAddressRepository.findOneById(id);

    if (!address) {
      throw new AddressNotFoundException();
    }

    if (address.userId !== userId) {
      throw new AddressNotAllowedException();
    }

    await this.shippingAddressRepository.delete(id);
  }

  async update(payload: IShippingAddress): Promise<void> {
    const address = await this.shippingAddressRepository.findOneById(payload.id);

    if (!address) {
      throw new AddressNotFoundException();
    }

    if (address.userId !== payload.userId) {
      throw new AddressNotAllowedException();
    }

    await this.shippingAddressRepository.persist(payload);
  }
}