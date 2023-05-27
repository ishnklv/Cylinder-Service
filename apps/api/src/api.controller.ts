import { BadRequestException, Body, Controller, Get, Param, Post, Res, LoggerService } from '@nestjs/common';
import { ApiService } from './api.service';
import { PrometheusExporter } from './prometheus-exporter';
import { Response } from 'express';
import { register } from 'prom-client';
import { createLogger, format, Logger, transports } from 'winston';

@Controller()
export class ApiController {
  private logger: Logger;
  constructor(
    private readonly apiService: ApiService,
    private readonly prometheusExporter: PrometheusExporter,
  ) {
    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp(),
        format.json()
      ),
      transports: [
        new transports.Console(),
      ],
    })
  }

  @Get( '/calculate-area/:radius/:height' )
  async calculateArea(
    @Param( 'radius' ) radius: number,
    @Param( 'height' ) height: number,
  ) {
    this.logger.info('Calculate Area received');

    return this.apiService.calculateArea( radius, height );
  }

  @Post( 'log-level' )
  async setLogLevel(
    @Body() body: { level: string },
  ) {
    const { level } = body;

    if( ![ 'info', 'debug' ].includes( level ) ) {
      throw new BadRequestException( 'Log level invalid' );
    }

    this.logger = createLogger({
      level,
      format: format.combine(
        format.timestamp(),
        format.json()
      ),
      transports: [
        new transports.Console(),
      ],
    });
  }

  @Get( '/healthcheck' )
  healthcheck() {
    return {
      status: 'ok',
    };
  }

  @Get( '/metrics' )
  async getMetrics(
    @Res() res: Response,
  ) {
    res.setHeader( 'Content-Type', register.contentType );
    res.send( await this.prometheusExporter.getMetrics() );
  }
}
