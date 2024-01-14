import { Injectable } from '@nestjs/common';
import { BillingAddressRepository } from './billing-address.repository';
import { IBillingAddress } from './interfaces/billing-address.interface';
import { AddressNotFoundException } from './exceptions/address-not-found.exception';
import { AddressNotAllowedException } from './exceptions/address-not-allowed.exception';

@Injectable()
export class BillingAddressService {
  constructor(
    private readonly billingAddressRepository: BillingAddressRepository,
  ) {}

  async add(payload: Omit<IBillingAddress, 'id'>): Promise<void> {
    await this.billingAddressRepository.create(payload);
  }

  async delete(id: number, userId: number): Promise<void> {
    const address = await this.billingAddressRepository.findOneById(id);

    if (!address) {
      throw new AddressNotFoundException();
    }

    if (address.userId !== userId) {
      throw new AddressNotAllowedException();
    }

    await this.billingAddressRepository.delete(id);
  }

  async update(payload: IBillingAddress): Promise<void> {
    const address = await this.billingAddressRepository.findOneById(payload.id);

    if (!address) {
      throw new AddressNotFoundException();
    }

    if (address.userId !== payload.userId) {
      throw new AddressNotAllowedException();
    }

    await this.billingAddressRepository.persist(payload);
  }
}