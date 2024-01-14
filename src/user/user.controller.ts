import { BadRequestException, Body, ConflictException, Controller, NotFoundException, Patch, Post } from '@nestjs/common';
import { CreateUserRequestDto } from './dto/create-user-request.dto';
import { UserService } from './user.service';
import { UserAlreadyExistException } from './exceptions/user-already-exist.exception';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post()
  async createUser(
    @Body() {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
    }: CreateUserRequestDto,
  ): Promise<void> {
    if (password !== confirmPassword) {
      throw new BadRequestException('Hasła się nie zgadzają');
    }

    try {
      await this.userService.createUser({
        email,
        password,
        firstName,
        lastName,
      });
    } catch (error) {
      if (error.constructor === UserAlreadyExistException) {
        throw new ConflictException('Użytkownik już istnieje z takim adresem e-mail');
      }

      throw error;
    }
  }
}
