import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  if (process.env.DATABASE_URL) {
    try {
      const url = new URL(process.env.DATABASE_URL);
      const config = {
        host: url.hostname,
        port: parseInt(url.port, 10) || 5432,
        user: url.username,
        password: url.password,
        name: url.pathname.slice(1),
        synchronize: process.env.DB_SYNC === 'true',
        autoLoadEntities: process.env.DB_AUTOLOAD === 'true' || true,
      };
      return config;
    } catch (error) {
      console.error('Failed to parse DATABASE_URL:', error);
      console.error('DATABASE_URL value:', process.env.DATABASE_URL);
    }
  }

  const config = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT!, 10) || 5432,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    synchronize: process.env.DB_SYNC === 'true',
    autoLoadEntities: process.env.DB_AUTOLOAD === 'true' || true,
  };
  return config;
});
