import { Controller, Get, Post, Render, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { Public } from './decorator/customize';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary/cloudinary.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
    private readonly cloudinaryService: CloudinaryService
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

  // @Public()
  // @Post('uploadCloundinary')
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadImage(@UploadedFile() file: Express.Multer.File) {
  //   if (file) {
  //     const res = await this.cloudinaryService.uploadFile(file);
  //     return res["secure_url"];
  //   } else {
  //     return "Không thấy file";
  //   }
  // }
}
