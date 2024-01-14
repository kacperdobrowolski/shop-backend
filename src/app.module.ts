import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppConfig } from './app.config';
import { KnexModule } from 'nestjs-knex';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { UserSettingModule } from './user-setting/user-setting.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [() => AppConfig],
    }),
    KnexModule.forRoot({
      config: AppConfig.database,
    }),
    UserModule,
    AuthModule,
    AdminModule,
    UserSettingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
