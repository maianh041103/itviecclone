import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsMongoId, IsNotEmpty, ValidateNested, isMongoId } from "class-validator";
import mongoose from "mongoose";

export class CreateRoleDto {
  @IsNotEmpty({ message: "Name không được để trống" })
  name: string;

  @IsNotEmpty({ message: "Description không được để trống" })
  description: string;

  @IsNotEmpty({ message: "Trạng thái không được để trống" })
  @IsBoolean({ message: "Phải là dạng boolean" })
  isActive: boolean;

  @IsNotEmpty({ message: "Name không được để trống" })
  @IsArray()
  @IsMongoId({ each: true })
  permissions: mongoose.Schema.Types.ObjectId[]
}
