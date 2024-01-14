import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateEmailDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail({}, {
    message: 'Niepoprawny adres e-mail',
  })
  email: string;
}