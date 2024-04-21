import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Permission, PermissionDocument } from 'src/permissions/schemas/permission.schema';
import { Role, RoleDocument } from 'src/roles/schemas/role.schema';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { ADMIN_ROLE, INIT_PERMISSIONS, USER_ROLE } from './sample';

@Injectable()
export class DatabasesService implements OnModuleInit {
  constructor(
    @InjectModel(User.name) private userModel: SoftDeleteModel<UserDocument>,
    @InjectModel(Permission.name) private permissionModel: SoftDeleteModel<PermissionDocument>,
    @InjectModel(Role.name) private roleModel: SoftDeleteModel<RoleDocument>,

    private configService: ConfigService,
    private userService: UsersService
  ) { }

  async onModuleInit() {
    if (Boolean(this.configService.get<string>("SHOULD_INIT")) === true) {
      //Kiểm tra đã tồn tại bản ghi
      const permissionCount = await this.permissionModel.count({});
      const roleCount = await this.roleModel.count({});
      const userCount = await this.userModel.count({});

      if (permissionCount === 0) {
        await this.permissionModel.insertMany(INIT_PERMISSIONS);
      }

      if (roleCount === 0) {
        const permissions = await this.permissionModel.find({}).select("_id");

        await this.roleModel.insertMany([{
          name: ADMIN_ROLE,
          description: "Có tất cả các quyền trong hệ thống",
          isActive: true,
          permissions: permissions
        }, {
          name: USER_ROLE,
          description: "Không có quyền quản trị hệ thống",
          isActive: true,
          permissions: []
        }])
      }

      if (userCount === 0) {
        const adminRole = await this.roleModel.findOne({
          name: ADMIN_ROLE
        });

        const userRole = await this.roleModel.findOne({
          name: USER_ROLE
        });

        await this.userModel.insertMany([{
          _id: "647b5108a8a243e8191855b5",
          name: "Mai Anh",
          email: "nguyenmaianh@gmail.com",
          password: this.userService.hashPassword(this.configService.get<string>("INIT_PASSWORD")),
          age: 20,
          gender: "male",
          address: "Hà Nội",
          role: adminRole?._id,
          company: {
            "_id": "6614e1b970330288c5bea6c6",
            "name": "TNHH1TV"
          }
        }, {
          name: "User",
          email: "nguyenuser@gmail.com",
          password: this.userService.hashPassword(this.configService.get<string>("INIT_PASSWORD")),
          age: 25,
          gender: "male",
          address: "Hà Nam",
          role: userRole?._id,
          company: {
            "_id": "6614e1b970330288c5bea6c6",
            "name": "TNHH1TV"
          }
        }])
      }
    }
  }

}
