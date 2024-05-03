import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from './multer.config';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [MulterModule.registerAsync({
    useClass: MulterConfigService
  }), CloudinaryModule],
  controllers: [FilesController],
  providers: [FilesService]
})
export class FilesModule { }
