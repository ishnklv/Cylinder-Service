import { Injectable } from '@nestjs/common';
import { Counter, Histogram, Registry, collectDefaultMetrics } from 'prom-client';

@Injectable()
export class PrometheusExporter {
  private readonly register: Registry;
  private readonly metrics = {
    messageProcessed: new Counter({
      name: 'api_messages_processed',
      help: 'Total number of messages processed',
    }),
    messageProcessingTime: new Histogram({
      name: 'app_message_processing_time',
      help: 'Time taken to process each message',
      buckets: [0.1, 0.5, 1, 5, 10],
    }),
    messageStatus: new Counter({
      name: 'app_message_status',
      help: 'Status of each message',
      labelNames: ['status'],
    }),
  }

  constructor() {
    this.register = new Registry();

    collectDefaultMetrics({register: this.register});

    this.register.registerMetric(this.metrics.messageProcessed);
    this.register.registerMetric(this.metrics.messageProcessingTime);
    this.register.registerMetric(this.metrics.messageStatus);
  }

  updateMetrics(time: number, status: string) {
    this.metrics.messageProcessed.inc();
    this.metrics.messageProcessingTime.observe(time);
    this.metrics.messageStatus.inc({
      status,
    });
  }

  async getMetrics() {
    return this.register.metrics();
  }
}
