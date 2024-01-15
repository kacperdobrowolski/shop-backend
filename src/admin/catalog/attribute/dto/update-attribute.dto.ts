import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAttributeDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}