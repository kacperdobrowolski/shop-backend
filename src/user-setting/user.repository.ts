import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { IUser } from './interface/user.interface';
import { EmailAlreadyExistException } from './exceptions/email-already-exist.exception';

@Injectable()
export class UserRepository {
  constructor(
    @InjectKnex() private readonly db: Knex,
  ) {}

  async findOneById(id: number): Promise<IUser> {
    return await this.db('user_users')
      .select(
        'id',
        'email',
        'password',
        'firstName',
        'lastName',
      )
      .where('id', id)
      .first();
  }

  async persist(user: IUser): Promise<void> {
    try {
      await this.db('user_users')
        .where('id', user.id)
        .update({
          email: user.email,
          password: user.password,
          firstName: user.firstName,
          lastName: user.lastName,
          updatedAt: new Date(),
        });
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new EmailAlreadyExistException();
      }

      throw error;
    }
  }
}