import { Injectable } from '@nestjs/common';

@Injectable()
export class MathServiceService {

  async calculateArea( { radius, height }: { radius: number, height: number } ) {
    return 2 * Math.PI * radius * (radius + height);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
