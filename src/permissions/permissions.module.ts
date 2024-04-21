import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Permission, PermissonSchema } from './schemas/permission.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Permission.name, schema: PermissonSchema }])],
  controllers: [PermissionsController],
  providers: [PermissionsService]
})
export class PermissionsModule { }
