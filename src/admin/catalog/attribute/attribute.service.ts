import { Injectable } from '@nestjs/common';
import { AttributeRepository } from './infrastructure/attribute.repository';
import { AttributeValueRepository } from './infrastructure/attribute-value.repository';
import { AttributeNotFoundException } from './exceptions/attribute-not-found.exception';

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
}