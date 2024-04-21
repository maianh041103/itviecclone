import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateSubscriberDto {
  @ApiProperty()
  @IsEmail({ message: "Định dạng email không chính xác" })
  @IsNotEmpty({ message: "Email không được để trống" })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: "Name không được để trống" })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: "Skills không được để trống" })
  @IsArray({ message: "Skills phải là kiểu mảng" })
  @IsString({ each: true, message: "Phần từ của skills có định dạng chuỗi ký tự" })
  skills: string[]
}
