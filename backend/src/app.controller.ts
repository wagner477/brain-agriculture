import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './modules/authentication/constants/authentication.constants';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.healthCheck();
  }
}
