import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import RedisStore from 'connect-redis';
import * as passport from 'passport';
import * as session from 'express-session';
import { createClient } from 'redis';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix(configService.get('prefix'));

  const redisClient = createClient({
    socket: {
      host: configService.get('redis.host'),
      port: configService.get('redis.port'),
    },
    database: configService.get('redis.db'),
  });

  redisClient.connect().catch(console.error);

  // @ts-expect-error xxx
  const redisStore = new RedisStore({
    // @ts-expect-error xxx
    client: redisClient,
    prefix: configService.get('auth.session.redisPrefix'),
  });

  app.use(
    session({
      store: redisStore,
      secret: configService.get('auth.session.secret'),
      resave: configService.get('auth.session.resave'),
      saveUninitialized: configService.get('auth.session.saveUninitialized'),
      cookie: {
        httpOnly: true,
        sameSite: 'strict',
        secure: configService.get('auth.session.cookieSecure'),
        maxAge: configService.get('auth.session.cookieMaxAge'),
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(configService.get('port'), configService.get('host'));
}
bootstrap();
