import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrometheusExporter } from './prometheus-exporter';
import { MetricsMiddleware } from './metrics.middleware';

@Module( {
  imports: [
    ConfigModule.forRoot( {
      envFilePath: '.env',
    } ),
    ClientsModule.registerAsync( {
      clients: [
        {
          name: 'MATH_SERVICE',
          imports: [ ConfigModule ],
          useFactory: ( configService: ConfigService ) => ( {
            transport: Transport.NATS,
            options: {
              servers: [
                configService.get( 'NATS_SERVER_URL', 'nats://localhost:4222' ),
              ],
            },
          } ),
          inject: [ ConfigService ],
        },
      ],
    } ),
  ],
  controllers: [ ApiController ],
  providers: [ ApiService, PrometheusExporter ],
} )
export class ApiModule implements NestModule {
  configure( consumer: MiddlewareConsumer ) {
    consumer
      .apply( MetricsMiddleware )
      .forRoutes( ApiController );
  }
}
