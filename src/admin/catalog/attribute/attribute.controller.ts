import { Body, ConflictException, Controller, Delete, NotFoundException, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { AttributeAlreadyExistException } from './exceptions/attribute-already-exist.exception';
import { AttributeService } from './attribute.service';
import { AssignAttributeValueDto } from './dto/assign-attribute-value.dto';
import { AttributeValueAlreadyExistException } from './exceptions/attribute-value-already-exist.exception';
import { AttributeNotFoundException } from './exceptions/attribute-not-found.exception';

@Controller('admin/catalog/attribute')
export class AttributeController {
  constructor(
    private readonly attributeService: AttributeService,
  ) {}

  @Post()
  async createAttribute(
    @Body() { name }: CreateAttributeDto,
  ): Promise<void> {
    try {
      await this.attributeService.createAttribute(name);
    } catch (error) {
      if (error.constructor === AttributeAlreadyExistException) {
        throw new ConflictException('Atrybut juz istnieje');
      }

      throw error;
    }
  }

  @Post('value')
  async assignAttributeValue(
    @Body() {
      attributeId,
      value,
    }: AssignAttributeValueDto,
  ): Promise<void> {
    try {
      await this.attributeService.assignAttributeValue(attributeId, value);
    } catch (error) {
      switch (error.constructor) {
        case AttributeNotFoundException:
          throw new NotFoundException('Nie ma takiego atrybutu');

        case AttributeValueAlreadyExistException:
          throw new ConflictException('Istnieje juz taka wartość dla tego atrybutu');

        default:
          throw error;
      }
    }
  }

  @Delete(':attrId')
  async deleteAttribute(
    @Param('attrId', ParseIntPipe) attrId: number,
  ): Promise<void> {
    await this.attributeService.deleteAttribute(attrId);
  }

  @Delete(':attrId/:valueId')
  async unassignAttributeValue(
    @Param('attrId', ParseIntPipe) attrId: number,
    @Param('valueId', ParseIntPipe) valueId: number,
  ): Promise<void> {
    await this.attributeService.unassignAttributeValue(
      attrId,
      valueId,
    );
  }
}