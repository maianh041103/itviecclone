import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { MulterOptionsFactory } from "@nestjs/platform-express";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import fs from 'fs';
import { diskStorage } from "multer";
import path, { join } from "path";

//Cấu trúc lại MulterOption cho thư viện Multer
@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  //Lấy ra đường dẫn thư mục
  // getRootPath = () => {
  //   return process.cwd(); //Thư mục hiện hành
  // }

  // //Kiểm tra chưa tồn tại thư mục thì tạo thư mục
  // ensureExists(targetDirectory: string) {
  //   fs.mkdir(targetDirectory, { recursive: true }, (error) => {
  //     if (!error) {
  //       console.log('Directory successfully created, or it already exists.'); return;
  //     }
  //     switch (error.code) {
  //       case 'EEXIST':
  //       // Error:
  //       // Requested location already exists, but it's not a directory. break;
  //       case 'ENOTDIR':
  //         // Error:
  //         // The parent hierarchy contains a file with the same name as the dir // you're trying to create.
  //         break;
  //       default:
  //         // Some other error like permission denied.
  //         console.error(error); break;
  //     }
  //   });
  // }


  createMulterOptions(): MulterOptions | Promise<MulterOptions> {
    return {
      // storage: diskStorage({ //Lưu dữ liệu ở trong ổ đĩa máy tính
      //   destination: (req, file, cb) => {
      //     const folder = req?.headers?.folder_type ?? "default"; //Lấy ra req.headers
      //     this.ensureExists(`public/images/${folder}`);
      //     cb(null, join(this.getRootPath(), `public/images/${folder}`));
      //   },
      //   filename: (req, file, cb) => { //get image
      //     let extName = path.extname(file.originalname);

      //     let baseName = path.basename(file.originalname, extName);

      //     let finalName = `${baseName}-${Date.now()}${extName}`
      //     cb(null, finalName);
      //   }
      // }),
      limits: {
        fileSize: 1024 * 1024 * 1, //1MB
      },
      fileFilter: (req: any, file: any, cb: any) => {
        const allowedFileTypes = ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx'];
        const fileExtension = file.originalname.split('.').pop().toLowerCase();
        const isValidFileType = allowedFileTypes.includes(fileExtension);
        if (isValidFileType) {
          cb(null, true);
        } else {
          cb(new HttpException('Invalid file type', HttpStatus.UNPROCESSABLE_ENTITY), null);
        }
      },
    }
  }

}