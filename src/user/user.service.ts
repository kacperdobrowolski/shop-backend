import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as argon2 from 'argon2';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async createUser(user: CreateUserDto): Promise<void> {
    const passwordHash = await argon2.hash(user.password);
    await this.userRepository.create({
      email: user.email,
      password: passwordHash,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  }
}
