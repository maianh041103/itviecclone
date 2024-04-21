import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Permission, PermissionDocument } from './schemas/permission.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/user.interface';
import mongoose from 'mongoose';
import aqp from 'api-query-params';

@Injectable()
export class PermissionsService {
  constructor(@InjectModel(Permission.name) private permissionModel: SoftDeleteModel<PermissionDocument>) { }

  async create(createPermissionDto: CreatePermissionDto, user: IUser) {
    const { name, apiPath, method, module } = createPermissionDto;
    const permissonExist = await this.permissionModel.findOne({
      apiPath: apiPath,
      method: method,
      isDeleted: false
    });

    if (permissonExist) {
      throw new BadRequestException(`Đã tồn tại permission có ${apiPath} và method ${method}`)
    }
    const newPermission = await this.permissionModel.create({
      name, apiPath, method, module,
      createdBy: {
        _id: user._id,
        email: user.email
      }
    });
    return {
      _id: newPermission._id,
      createdAt: newPermission.createdAt
    }
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    try {
      let { filter, sort, projection, population } = aqp(qs);
      delete filter.current;
      delete filter.pageSize;

      let defaultLimit = limit ? limit : 2;
      let totalRecord = (await this.permissionModel.find(filter)).length;
      let totalPage = Math.ceil(totalRecord / defaultLimit);
      let skip = (currentPage - 1) * defaultLimit;

      if (!sort) {
        sort = "-updatedAt" as any;
      }
      const result = await this.permissionModel.find(filter)
        .skip(skip)
        .limit(limit)
        .sort(sort as any)
        .populate(population)
        .exec();

      return {
        "meta": {
          "current": currentPage,
          "pageSize": defaultLimit,
          "pages": totalPage,
          "total": totalRecord
        },
        "result": result
      }
    } catch (error) {
      console.log(error);
      throw new BadRequestException("Không tìm thấy danh sách quyền");
    }
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Id không hợp lệ");
    }

    return await this.permissionModel.findOne({
      _id: id
    });
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Id không hợp lệ");
    }

    return await this.permissionModel.updateOne({
      _id: id
    }, {
      ...updatePermissionDto,
      updatedBy: {
        _id: user._id,
        email: user.email
      }
    });
  }

  async remove(id: string, user: IUser) {
    await this.permissionModel.updateOne({
      _id: id
    }, {
      deletedBy: {
        _id: user._id,
        email: user.email
      }
    })
    return await this.permissionModel.softDelete({
      _id: id
    })
  }
}
