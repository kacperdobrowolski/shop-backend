import { Body, ConflictException, Controller, Delete, NotFoundException, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { AttributeAlreadyExistException } from './exceptions/attribute-already-exist.exception';
import { AttributeService } from './attribute.service';
import { AssignAttributeValueDto } from './dto/assign-attribute-value.dto';
import { AttributeValueAlreadyExistException } from './exceptions/attribute-value-already-exist.exception';
import { AttributeNotFoundException } from './exceptions/attribute-not-found.exception';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { UpdateAttributeValueDto } from './dto/update-attribute-value.dto';
import { AttributeValueNotFoundException } from './exceptions/attribute-value-not-found.exception';

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

  @Patch(':attrId')
  async updateAttribute(
    @Param('attrId', ParseIntPipe) attrId: number,
    @Body() { name }: UpdateAttributeDto,
  ): Promise<void> {
    try {
      await this.attributeService.updateAttribute({
        id: attrId,
        name,
      });
    } catch (error) {
      if (error.constructor === AttributeNotFoundException) {
        throw new NotFoundException('Nie ma takiego atrybutu');
      }

      throw error;
    }
  }

  @Patch(':attrId/:valueId')
  async updateAttributeValue(
    @Param('attrId', ParseIntPipe) attrId: number,
    @Param('valueId', ParseIntPipe) valueId: number,
    @Body() { value }: UpdateAttributeValueDto,
  ): Promise<void> {
    try {
      await this.attributeService.updateAttributeValue(
        attrId,
        valueId,
        value,
      );
    } catch (error) {
      switch (error.constructor) {
        case AttributeNotFoundException:
          throw new NotFoundException('Nie ma takiego atrybutu');

        case AttributeValueNotFoundException:
          throw new NotFoundException('Nie ma takiej wartości atrybutu');

        default:
          throw error;
      }
    }
  }
}