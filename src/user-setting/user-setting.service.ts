import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserNotFoundException } from './exceptions/user-not-found.exception';
import { InvalidOldPasswordException } from './exceptions/invalid-old-password.exception';
import * as argon2 from 'argon2';
import { SameEmailException } from './exceptions/same-email.exception';

@Injectable()
export class UserSettingService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async updatePassword(
    userId: number,
    oldPassword: string,
    newPassword: string,
  ): Promise<void> {
    const user = await this.userRepository.findOneById(userId);

    if (!user) {
      throw new UserNotFoundException();
    }

    const passwordMatched = await argon2.verify(user.password, oldPassword);

    if (!passwordMatched) {
      throw new InvalidOldPasswordException();
    }

    user.password = await argon2.hash(newPassword);
    await this.userRepository.persist(user);
  }

  // TODO: send email message
  async updateEmail(
    userId: number,
    newEmail: string,
  ): Promise<void> {
    const user = await this.userRepository.findOneById(userId);

    if (!user) {
      throw new UserNotFoundException();
    }

    if (user.email === newEmail) {
      throw new SameEmailException();
    }

    user.email = newEmail;
    await this.userRepository.persist(user);
  }

  async updateFullName(
    userId: number,
    firstName: string,
    lastName: string,
  ): Promise<void> {
    const user = await this.userRepository.findOneById(userId);

    if (!user) {
      throw new UserNotFoundException();
    }

    user.firstName = firstName;
    user.lastName = lastName;
    await this.userRepository.persist(user);
  }
}