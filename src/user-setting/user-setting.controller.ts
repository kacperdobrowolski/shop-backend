import { BadRequestException, Body, ConflictException, Controller, NotFoundException, Patch } from '@nestjs/common';
import { AuthedUser } from 'src/auth/user.decorator';
import { UserNotFoundException } from './exceptions/user-not-found.exception';
import { UserSettingService } from './user-setting.service';
import { UpdateEmailDto } from './dto/update-email.dto';
import { UpdateFullNameDto } from './dto/update-fullname.dto';
import { InvalidOldPasswordException } from './exceptions/invalid-old-password.exception';
import { UpdatePasswordRequestDto } from './dto/update-password-request.dto';
import { SameEmailException } from './exceptions/same-email.exception';
import { EmailAlreadyExistException } from './exceptions/email-already-exist.exception';

@Controller('user-setting')
export class UserSettingController {
  constructor(
    private readonly userSettingService: UserSettingService,
  ) {}

  @Patch('password')
  async updatePassword(
    @AuthedUser() user: any,
    @Body() {
      oldPassword,
      newPassword,
      confirmNewPassword,
    }: UpdatePasswordRequestDto,
  ): Promise<void> {
    if (newPassword !== confirmNewPassword) {
      throw new BadRequestException('Hasła się nie zgadzają');
    }

    try {
      await this.userSettingService.updatePassword(
        user.id,
        oldPassword,
        newPassword,
      );
    } catch (error) {
      switch (error.constructor) {
        case UserNotFoundException:
          throw new NotFoundException('Nie znaleziono uzytkownika');

        case InvalidOldPasswordException:
          throw new BadRequestException('Stare hasło jest niepoprawne');

        default:
          throw error;
      }
    }
  }

  @Patch('email')
  async updateEmail(
    @AuthedUser() user: any,
    @Body() {
      email,
    }: UpdateEmailDto,
  ): Promise<void> {
    try {
      await this.userSettingService.updateEmail(
        user.id,
        email,
      );
    } catch (error) {
      switch (error.constructor) {
        case UserNotFoundException:
          throw new NotFoundException('Nie znaleziono uzytkownika');
        
        case SameEmailException:
          throw new BadRequestException('Ten email jest aktualnie przypisany do tego konta');

        case EmailAlreadyExistException:
          throw new ConflictException('Adres email jest juz zajęty');

        default:
          throw error;
      }
    }
  }

  @Patch('full-name')
  async updateFullName(
    @AuthedUser() user: any,
    @Body() {
      firstName,
      lastName,
    }: UpdateFullNameDto,
  ): Promise<void> {
    try {
      await this.userSettingService.updateFullName(
        user.id,
        firstName,
        lastName,
      );
    } catch (error) {
      if (error.constructor === UserNotFoundException) {
        throw new NotFoundException('Nie znaleziono uzytkownika');
      }

      throw error;
    }
  }
}