import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { LocalStrategy } from './local.strategy';
import { UserRepository } from './user.repository';
import { SessionGuard } from './session.guard';

@Module({
  controllers: [
    AuthController,
  ],
  providers: [
    AuthService,
    LocalAuthGuard,
    LocalStrategy,
    UserRepository,
    SessionGuard,
  ],
})
export class AuthModule {}
