import { Controller, Get, Post, Render, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) { }

  //Ví dụ
  @Get()
  @Render("home")
  getHello() {
    console.log(this.configService.get<String>('PORT'));
    return {
      message: this.appService.getHello()
    }
  }
}
