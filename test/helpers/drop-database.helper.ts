import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export async function dropDatabase(config: ConfigService): Promise<void> {
  const AppDatasource = await new DataSource({
    type: 'postgres',
    host: config.get<string>('database.host'),
    port: config.get<number>('database.port'),
    username: config.get<string>('database.user'),
    password: config.get<string>('database.password'),
    database: config.get<string>('database.name'),
  }).initialize();

  await AppDatasource.dropDatabase();

  await AppDatasource.destroy();
}
