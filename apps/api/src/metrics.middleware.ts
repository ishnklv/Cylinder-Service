import { Injectable, NestMiddleware } from '@nestjs/common';
import { PrometheusExporter } from './prometheus-exporter';
import * as process from 'process';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class MetricsMiddleware implements NestMiddleware {
  constructor(
    private readonly prometheusExporter: PrometheusExporter,
  ) {
  }
  use( req: Request, res: Response, next: NextFunction ): void {
    const start = process.hrtime();

    res.on('finish', () => {
      const end = process.hrtime(start);
      const processingTimeInMs = end[0] * 1000 + end[1] / 1000000;
      const status =  res.statusCode.toString();

      this.prometheusExporter.updateMetrics(
        processingTimeInMs,
        status,
      );
    });

    next();
  }
}
