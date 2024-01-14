import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Max, Min } from 'class-validator';

export class UpdateCodeDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 32)
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(100)
  discountPercent: number;

  @IsOptional()
  @IsNumber()
  numberOfUses: number = -1;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  expiresAt: Date;
}