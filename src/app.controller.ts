import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './metadata';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() body: any): any {
    return this.appService.login(body);
  }
}
