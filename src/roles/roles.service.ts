import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { IUser } from 'src/users/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from './schemas/role.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import mongoose from 'mongoose';
import aqp from 'api-query-params';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: SoftDeleteModel<RoleDocument>) { }

  async create(createRoleDto: CreateRoleDto, user: IUser) {
    const { name, description, isActive, permissions } = createRoleDto;

    const roleExist = await this.roleModel.findOne({
      name: name,
      isDeleted: false
    });
    if (roleExist) {
      throw new BadRequestException(`Nhóm quyền ${name} đã tồn tại`);
    }

    const newRole = await this.roleModel.create({
      name, description, isActive, permissions, createdBy: {
        _id: user._id,
        email: user.email
      }
    });
    return {
      _id: newRole._id,
      createdAt: newRole.createdAt
    }
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    try {
      let { filter, sort, projection, population } = aqp(qs);
      delete filter.current;
      delete filter.pageSize;

      let defaultLimit = limit ? limit : 2;
      let totalRecord = (await this.roleModel.find(filter)).length;
      let totalPage = Math.ceil(totalRecord / defaultLimit);
      let skip = (currentPage - 1) * defaultLimit;

      if (!sort) {
        sort = "-updatedAt" as any;
      }
      const result = await this.roleModel.find(filter)
        .skip(skip)
        .limit(limit)
        .sort(sort as any)
        .populate(population as any)
        .select(projection)
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
      throw new BadRequestException("Không tìm thấy danh sách nhóm quyền");
    }
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new BadRequestException(`${id} không hợp lệ`);
    const role = await this.roleModel.findById(id)
      .populate({ path: "permissions", select: { _id: 1, apiPath: 1, name: 1, method: 1, module: 1 } });
    return role;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Id không đúng định dạng");
    }

    const roleExist = await this.roleModel.findOne({
      name: updateRoleDto.name,
      _id: { $ne: id }
    });
    if (roleExist) {
      throw new BadRequestException(`Nhóm quyền ${updateRoleDto.name} đã tồn tại`);
    }

    return await this.roleModel.updateOne({
      _id: id
    }, {
      ...updateRoleDto,
      updateBy: {
        _id: user._id,
        email: user.email
      }
    });
  }

  async remove(id: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new BadRequestException("Id không hợp lệ");

    const role = await this.roleModel.findById(id);
    if (role.name === "ADMIN")
      throw new BadRequestException("Không thể xóa nhóm quyền admin");

    await this.roleModel.updateOne({
      _id: id
    }, {
      deletedBy: {
        _id: user._id,
        email: user.email
      }
    });

    return await this.roleModel.softDelete({
      _id: id
    });
  }

  async findRoleIdByName(name: string) {
    return (await this.roleModel.findOne({
      name: name
    }))._id;
  }
}
