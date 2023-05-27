import { NestFactory } from '@nestjs/core';
import { MathServiceModule } from './math-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { config } from 'dotenv';
import * as process from 'process';
import { Logger } from '@nestjs/common';

config({
  path: '.env',
});

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(MathServiceModule, {
    transport: Transport.NATS,
    options: {
      servers: [
        process.env.NATS_SERVER_URL,
      ],
    }
  });

  const logger = new Logger(bootstrap.name);

  await app
    .listen()
    .then(
      () => logger.log(`Math Service Listening`),
    )
}

bootstrap();
