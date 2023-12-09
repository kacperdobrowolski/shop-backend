export const AppConfig = {
  host: process.env.HOST || '127.0.0.1',
  port: +process.env.PORT || 8080,
  prefix: process.env.PREFIX || '',

  database: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST || '127.0.0.1',
      port: +process.env.DB_PORT || 3306,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'migration',
      extension: 'ts',
    },
  },

  auth: {
    session: {
      secret: process.env.SESSION_SECRET,
      redisPrefix: process.env.SESSION_REDIS_PREFIX,
      resave: process.env.SESSION_RESAVE === 'true' ? true : false,
      saveUninitialized: process.env.SESSION_SAVE_UNINITIALIZED === 'true' ? true : false,

      cookieSecure: process.env.SESSION_COOKIE_SECURE === 'true' ? true : false,
      cookieMaxAge: +process.env.SESSION_COOKIE_MAX_AGE,
    },
  },

  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: +process.env.REDIS_PORT || 6379,
    db: +process.env.REDIS_DB,
    username: process.env.REDIS_USER,
    password: process.env.REDIS_PASSWORD,
  },
};
