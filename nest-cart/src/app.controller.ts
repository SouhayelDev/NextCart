import { Controller, Get } from '@nestjs/common';


@Controller()
export class AppController {


  @Get()
  getHello(): string {
    return 'Products API is running!';
  }
}
