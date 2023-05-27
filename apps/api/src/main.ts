import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  const logger = new Logger(bootstrap.name);

  const configService: ConfigService = app.get(ConfigService);

  const PORT = configService.get('API_PORT', 3000);
  const HOST = configService.get('API_HOST', '0.0.0.0');

  await app.listen(
    PORT,
    HOST,
    () => logger.log(`Api listening on ${HOST}:${PORT}`),
  );
}
bootstrap();
