import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ApiService {
  constructor(
    @Inject('MATH_SERVICE') private client: ClientProxy,
  ) {
  }

  async calculateArea(radius: number, height: number) {
    const area = await this.client.send(
      'calculate-area',
      {
        radius,
        height,
      },
    ).toPromise();

    return {
      area,
    };
  }
  getHello(): string {
    return 'Hello World!';
  }
}
