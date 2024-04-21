import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsMongoId, IsNotEmpty, ValidateNested, isMongoId } from "class-validator";
import mongoose from "mongoose";

export class CreateRoleDto {
  @ApiProperty()
  @IsNotEmpty({ message: "Name không được để trống" })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: "Description không được để trống" })
  description: string;

  @ApiProperty()
  @IsNotEmpty({ message: "Trạng thái không được để trống" })
  @IsBoolean({ message: "Phải là dạng boolean" })
  isActive: boolean;

  @ApiProperty()
  @IsNotEmpty({ message: "Name không được để trống" })
  @IsArray()
  @IsMongoId({ each: true })
  permissions: mongoose.Schema.Types.ObjectId[]
}
