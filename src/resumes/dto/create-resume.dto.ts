import { Type } from "class-transformer";
import { IsEmail, IsMongoId, IsNotEmpty, IsObject, ValidateNested } from "class-validator";
import mongoose from "mongoose";


export class CreateResumeDto {
  @IsNotEmpty({ message: "Email không được để trống" })
  @IsEmail({}, { message: "Không đúng định dạng email" })
  email: string;

  @IsNotEmpty({ message: "userId không được để trống" })
  userId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty({ message: "Url không được để trống" })
  url: string;

  @IsNotEmpty({ message: "Status không được để trống" })
  status: string;

  @IsNotEmpty({ message: "CompanyId không được để trống" })
  @IsMongoId({ message: "companyId là kiểu id" })
  companyId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty({ message: "JobId không được để trống" })
  @IsMongoId({ message: "jobId là kiểu id" })
  jobId: mongoose.Schema.Types.ObjectId;
}

export class CreateUserCvDto {
  @IsNotEmpty({ message: "Url không được để trống" })
  url: string;

  @IsNotEmpty({ message: "CompanyId không được để trống" })
  @IsMongoId({ message: "companyId là kiểu id" })
  companyId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty({ message: "JobId không được để trống" })
  @IsMongoId({ message: "jobId là kiểu id" })
  jobId: mongoose.Schema.Types.ObjectId;
}
