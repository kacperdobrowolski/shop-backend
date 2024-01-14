import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateFullNameDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 64)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 64)
  lastName: string;
}