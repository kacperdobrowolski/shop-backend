import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AssignAttributeValueDto {
  @IsNotEmpty()
  @IsNumber()
  attributeId: number;

  @IsNotEmpty()
  @IsString()
  value: string;
}