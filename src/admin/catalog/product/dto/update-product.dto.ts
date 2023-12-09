import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

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
}
