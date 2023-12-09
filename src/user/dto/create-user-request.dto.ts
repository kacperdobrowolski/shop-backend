import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserRequestDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail({}, {
    message: 'Niepoprawny adres e-mail',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 32)
  password: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 32)
  confirmPassword: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 64)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 64)
  lastName: string;
}
