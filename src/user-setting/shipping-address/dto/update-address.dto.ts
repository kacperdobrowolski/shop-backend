import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateAddressDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;
  
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  street: string;

  @IsNotEmpty()
  @IsString()
  houseNumber: string;

  @IsOptional()
  @IsString()
  apartmentNumber: string;

  @IsNotEmpty()
  @IsString()
  zipCode: string;

  @IsNotEmpty()
  @IsString()
  place: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  phone: string;
}