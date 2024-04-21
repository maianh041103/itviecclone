import { IsArray, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateSubscriberDto {
  @IsEmail({ message: "Định dạng email không chính xác" })
  @IsNotEmpty({ message: "Email không được để trống" })
  email: string;

  @IsNotEmpty({ message: "Name không được để trống" })
  name: string;

  @IsNotEmpty({ message: "Skills không được để trống" })
  @IsArray({ message: "Skills phải là kiểu mảng" })
  @IsString({ each: true, message: "Phần từ của skills có định dạng chuỗi ký tự" })
  skills: string[]
}
