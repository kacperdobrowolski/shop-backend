import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';

@Injectable()
export class UserRepository {
  constructor(
    @InjectKnex() private readonly db: Knex,
  ) {}

  // TODO
  async findOneByEmail(email: string): Promise<Record<string, any>> {
    return await this.db('user_users')
      .select('id', 'password')
      .where('email', email)
      .first();
  }
}
