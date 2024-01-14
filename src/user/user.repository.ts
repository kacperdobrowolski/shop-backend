import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { IUser } from './interfaces/user.interface';
import { UserAlreadyExistException } from './exceptions/user-already-exist.exception';

@Injectable()
export class UserRepository {
  constructor(
    @InjectKnex() private readonly db: Knex,
  ) {}

  async create(user: Omit<IUser, 'id'>): Promise<void> {
    try {
      await this.db('user_users')
        .insert({
          email: user.email,
          password: user.password,
          firstName: user.firstName,
          lastName: user.lastName,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new UserAlreadyExistException();
      }

      throw error;
    }
  }
}
