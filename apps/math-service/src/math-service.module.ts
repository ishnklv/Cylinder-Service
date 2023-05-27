import { Module } from '@nestjs/common';
import { MathServiceController } from './math-service.controller';
import { MathServiceService } from './math-service.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [MathServiceController],
  providers: [MathServiceService],
})
export class MathServiceModule {}
