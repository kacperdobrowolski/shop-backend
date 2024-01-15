import { Injectable } from '@nestjs/common';
import { AttributeRepository } from './infrastructure/attribute.repository';
import { AttributeValueRepository } from './infrastructure/attribute-value.repository';
import { AttributeNotFoundException } from './exceptions/attribute-not-found.exception';
import { IAttribute } from './interfaces/attribute.interface';
import { AttributeValueNotFoundException } from './exceptions/attribute-value-not-found.exception';

@Injectable()
export class AttributeService {
  constructor(
    private readonly attributeRepository: AttributeRepository,
    private readonly attributeValueRepository: AttributeValueRepository,
  ) {}

  async createAttribute(name: string): Promise<void> {
    await this.attributeRepository.create(name);
  }

  async assignAttributeValue(
    attributeId: number,
    value: string,
  ): Promise<void> {
    const attribute = await this.attributeRepository.findOneById(attributeId);

    if (!attribute) {
      throw new AttributeNotFoundException();
    }

    await this.attributeValueRepository.create(attributeId, value);
  }

  async unassignAttributeValue(
    attributeId: number,
    attributeValueId: number,
  ): Promise<void> {
    await this.attributeValueRepository.delete(attributeId, attributeValueId);
  }

  async deleteAttribute(attributeId: number): Promise<void> {
    await this.attributeRepository.delete(attributeId);
  }

  async updateAttribute(attribute: IAttribute): Promise<void> {
    const attr = await this.attributeRepository.findOneById(attribute.id);

    if (!attr) {
      throw new AttributeNotFoundException();
    }

    attr.name = attribute.name;
    await this.attributeRepository.persist(attr);
  }

  async updateAttributeValue(
    attrId: number,
    attrValueId: number,
    value: string,
  ): Promise<void> {
    const attribute = await this.attributeRepository.findOneById(attrId);

    if (!attribute) {
      throw new AttributeNotFoundException();
    }

    const attributeValue = await this.attributeValueRepository.findOneById(attrValueId);

    if (!attributeValue) {
      throw new AttributeValueNotFoundException();
    }

    attributeValue.value = value;
    await this.attributeValueRepository.persist(attributeValue);
  }
}