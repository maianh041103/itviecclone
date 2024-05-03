import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpStatus, UseFilters } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/core/http-exception.filter';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@ApiTags('File')
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly cloudinaryService: CloudinaryService
  ) { }

  // @Public()
  // @Post('upload')
  // @ResponseMessage("Upload single file")
  // @UseInterceptors(FileInterceptor('fileUpload'))
  // @UseFilters(HttpExceptionFilter)
  // uploadFile(@UploadedFile(
  //   new ParseFilePipeBuilder()
  //     .build({
  //       errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
  //     }),
  // ) file: Express.Multer.File) {
  //   return {
  //     fileName: file.filename
  //   }
  // }

  @Public()
  @Post('upload')
  @ResponseMessage("Upload single file to cloudinary")
  @UseInterceptors(FileInterceptor('fileUpload'))
  async uploadImage(@UploadedFile(new ParseFilePipeBuilder()
    .build({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
    }),) file: Express.Multer.File) {
    if (file) {
      const res = await this.cloudinaryService.uploadFile(file);
      return {
        fileName: res["secure_url"]
      }
    } else {
      return "Không thấy file";
    }
  }

  @Get()
  findAll() {
    return this.filesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.filesService.update(+id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.remove(+id);
  }
}
