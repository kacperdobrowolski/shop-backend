import { Body, ConflictException, Controller, Delete, NotFoundException, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateCodeDto } from './dto/create-code.dto';
import { DiscountCodeAlreadyExistException } from './exceptions/discount-code-already-exist.exception';
import { DiscountCodeService } from './discount-code.service';
import { UpdateCodeDto } from './dto/update-code.dto';
import { DiscountCodeNotFoundException } from './exceptions/discount-code-not-found.exception';

@Controller('admin/discount-code')
export class DiscountCodeController {
  constructor(
    private readonly discountCodeService: DiscountCodeService,
  ) {}ś

  @Post()
  async createCode(
    @Body() {
      name,
      discountPercent,
      numberOfUses,
      expiresAt,
    }: CreateCodeDto,
  ): Promise<void> {
    try {
      await this.discountCodeService.create({
        name,
        discountPercent,
        numberOfUses,
        expiresAt,
      });
    } catch (error) {
      if (error.constructor === DiscountCodeAlreadyExistException) {
        throw new ConflictException('Taki kod rabatowy juz istnieje');
      }

      throw error;
    }
  }

  @Delete(':id')
  async deleteCode(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.discountCodeService.delete(id);
  }

  @Patch(':id')
  async updateCode(
    @Param('id', ParseIntPipe) id: number,
    @Body() {
      name,
      discountPercent,
      numberOfUses,
      expiresAt,
    }: UpdateCodeDto,
  ): Promise<void> {
    try {
      await this.discountCodeService.update({
        id,
        name,
        discountPercent,
        numberOfUses,
        expiresAt,
      });
    } catch (error) {
      switch (error.constructor) {
        case DiscountCodeNotFoundException:
          throw new NotFoundException('Nie ma takiego kodu rabatowego');

        case DiscountCodeAlreadyExistException:
          throw new ConflictException('Taki kod rabatowy juz istnieje');

        default:
          throw error;
      }
    }
  }
}