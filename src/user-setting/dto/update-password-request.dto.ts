import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdatePasswordRequestDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 32)
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 32)
  newPassword: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 32)
  confirmNewPassword: string;
}