//dto : Data transfer object

import { IsEmail, IsNotEmpty, IsNotEmptyObject, IsObject, ValidateNested } from "class-validator";

import { Type } from 'class-transformer';
import mongoose from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

class Company {
  @IsNotEmpty()
  _id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  name: string;
}

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: "Email không được để trống" })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: "Email không được để trống" })
  @IsEmail({}, { message: "Email không đúng định dạng" })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: "Mật khẩu không được để trống" })
  password: string;

  @ApiProperty()
  @IsNotEmpty({ message: "Tuổi không được để trống" })
  age: number;

  @ApiProperty()
  @IsNotEmpty({ message: "Địa chỉ không được để trống" })
  address: string;

  @ApiProperty()
  @IsNotEmpty({ message: "Quyền không được để trống" })
  role: string;

  @ApiProperty()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Company)
  company: Company;
}

export class RegisterUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: "Email không được để trống" })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: "Email không được để trống" })
  @IsEmail({}, { message: "Email không đúng định dạng" })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: "Mật khẩu không được để trống" })
  password: string;

  @ApiProperty()
  @IsNotEmpty({ message: "Tuổi không được để trống" })
  age: number;

  @ApiProperty()
  @IsNotEmpty({ message: "Địa chỉ không được để trống" })
  address: string;
}

