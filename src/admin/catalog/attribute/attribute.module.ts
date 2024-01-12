import { Module } from '@nestjs/common';
import { AttributeController } from './attribute.controller';
import { AttributeService } from './attribute.service';
import { AttributeRepository } from './infrastructure/attribute.repository';
import { AttributeValueRepository } from './infrastructure/attribute-value.repository';

@Module({
  controllers: [AttributeController],
  providers: [
    AttributeService,
    AttributeRepository,
    AttributeValueRepository,
  ],
})
export class AttributeModule {}