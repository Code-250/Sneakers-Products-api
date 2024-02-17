import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}
  getHello(): any {
    return {
      message: 'Sneakers Products API',
    };
  }
}
