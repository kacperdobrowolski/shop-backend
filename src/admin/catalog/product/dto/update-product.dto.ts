import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, Min, ValidateNested } from 'class-validator';

export class UpdateProductDto {
  @IsNotEmpty({
    message: 'Nazwa produktu jest wymagana',
  })
  @IsString()
  name: string;

  @IsNotEmpty({
    message: 'Cena jest wymagana',
  })
  @IsInt()
  @Min(1, {
    message: 'Cena musi być większa niż 0',
  })
  price: number;

  @IsNotEmpty({
    message: 'Opis jest wymagany',
  })
  @IsString()
  description: string;

  @IsNotEmpty({
    message: 'Zdjecie jest wymagane',
  })
  @IsString()
  image: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  attributeValueIds: number[] = [];

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  categoryIds: number[] = [];
}
