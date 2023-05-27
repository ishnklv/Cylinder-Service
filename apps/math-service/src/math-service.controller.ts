import { Controller, Get } from '@nestjs/common';
import { MathServiceService } from './math-service.service';
import { Ctx, MessagePattern, NatsContext, Payload } from '@nestjs/microservices';

@Controller()
export class MathServiceController {
  constructor(private readonly mathServiceService: MathServiceService) {}

  @MessagePattern('calculate-area')
  async calculateArea(
    @Payload() data: { radius: number, height: number },
    @Ctx() ctx: NatsContext,
  ) {
    return this.mathServiceService.calculateArea(data);
  }

  @Get()
  getHello(): string {
    return this.mathServiceService.getHello();
  }
}
