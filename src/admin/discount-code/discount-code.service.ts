import { Injectable } from '@nestjs/common';
import { IDiscountCode } from './interfaces/discount-code.interface';
import { DiscountCodeRepository } from './discount-code.repository';
import { DiscountCodeNotFoundException } from './exceptions/discount-code-not-found.exception';

@Injectable()
export class DiscountCodeService {
  constructor(
    private readonly discountCodeRepository: DiscountCodeRepository,
  ) {}

  async create(discountCode: Omit<IDiscountCode, 'id'>): Promise<void> {
    await this.discountCodeRepository.create(discountCode);
  }

  async delete(id: number): Promise<void> {
    await this.discountCodeRepository.delete(id);
  }

  async update(discountCode: IDiscountCode): Promise<void> {
    const existingDiscountCode = await this.discountCodeRepository.findOneById(discountCode.id);

    if (!existingDiscountCode) {
      throw new DiscountCodeNotFoundException();
    }

    await this.discountCodeRepository.persist(discountCode);
  }
}