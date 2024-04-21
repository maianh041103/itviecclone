//dto : Data transfer object

import { IsEmail, IsNotEmpty, IsNotEmptyObject, IsObject, ValidateNested } from "class-validator";

import { Type } from 'class-transformer';
import mongoose from "mongoose";

class Company {
  @IsNotEmpty()
  _id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  name: string;
}

export class CreateUserDto {
  @IsNotEmpty({ message: "Email không được để trống" })
  name: string;

  @IsNotEmpty({ message: "Email không được để trống" })
  @IsEmail({}, { message: "Email không đúng định dạng" })
  email: string;

  @IsNotEmpty({ message: "Mật khẩu không được để trống" })
  password: string;

  @IsNotEmpty({ message: "Tuổi không được để trống" })
  age: number;

  @IsNotEmpty({ message: "Địa chỉ không được để trống" })
  address: string;

  @IsNotEmpty({ message: "Quyền không được để trống" })
  role: string;

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Company)
  company: Company;
}

export class RegisterUserDto {
  @IsNotEmpty({ message: "Email không được để trống" })
  name: string;

  @IsNotEmpty({ message: "Email không được để trống" })
  @IsEmail({}, { message: "Email không đúng định dạng" })
  email: string;

  @IsNotEmpty({ message: "Mật khẩu không được để trống" })
  password: string;

  @IsNotEmpty({ message: "Tuổi không được để trống" })
  age: number;

  @IsNotEmpty({ message: "Địa chỉ không được để trống" })
  address: string;
}

