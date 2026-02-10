import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { appCreate } from './app.create';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  appCreate(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
