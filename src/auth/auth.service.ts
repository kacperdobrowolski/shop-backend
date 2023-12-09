import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<any> {
    const user = await this.userRepository.findOneByEmail(email);

    if (user) {
      const isPasswordMatched = await argon2.verify(user.password, password);

      if (isPasswordMatched) {
        return {
          id: user.id,
        };
      }
    }
    return null;
  }
}
