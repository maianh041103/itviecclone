import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserLoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'nguyenmaianh@gmail.com', description: 'email' })
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'maianh20',
    description: 'password',
  })
  readonly password: string;
}