import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import mongoose from 'mongoose';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from './user.interface';
import aqp from 'api-query-params';
import { Role, RoleDocument } from 'src/roles/schemas/role.schema';
import { USER_ROLE } from 'src/databases/sample';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: SoftDeleteModel<UserDocument>,
    @InjectModel(Role.name) private roleModel: SoftDeleteModel<RoleDocument>
  ) { }

  hashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  }

  async create(createUserDto: CreateUserDto, userCreate: IUser) {
    //Check email exist
    const isExist = await this.userModel.findOne({
      email: createUserDto.email
    });
    if (isExist) {
      throw new BadRequestException(`Email ${createUserDto.email} đã tồn tại trên hệ thống. Vui lòng sử dụng email khác`);
    }

    const userRole = await this.roleModel.findOne({
      name: USER_ROLE
    });

    let passwordHash = this.hashPassword(createUserDto.password);
    createUserDto.password = passwordHash;
    const user = await this.userModel.create({
      ...createUserDto,
      role: userRole._id,
      createdBy: {
        _id: userCreate._id,
        email: userCreate.email
      }
    });
    return {
      _id: user._id,
      createdAt: user.createdAt
    };
  }

  async findAll(currentPage: number, limit: number, qs) {
    try {
      let { filter, sort, projection, population } = aqp(qs);
      delete filter.current;
      delete filter.pageSize;

      let defaultLimit = limit ? limit : 2;
      let totalRecord = (await this.userModel.find(filter)).length;
      let totalPage = Math.ceil(totalRecord / defaultLimit);
      let skip = (currentPage - 1) * defaultLimit;

      if (!sort) {
        sort = "-updatedAt" as any;
      }
      const result = await this.userModel.find(filter)
        .skip(skip)
        .limit(defaultLimit)
        .sort(sort as any)
        .select("-password")
        .populate(population)
        .exec();

      return {
        "meta": {
          "current": currentPage,
          "pageSize": limit,
          "pages": totalPage,
          "total": totalRecord
        },
        "result": result
      }
    } catch (error) {
      console.log(error);
      return "Không thể tìm thấy danh sách người dùng";
    }
  }

  async findOne(id: string) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      let user = await this.userModel.findById(id)
        .select("-password")
        .populate({ path: "role", select: { _id: 1, name: 1 } });
      return user;
    }
    else {
      return "Không thể tìm thấy người dùng";
    }
  }

  async findOneByUserName(username: string) {
    const user = await this.userModel.findOne({
      email: username
    }).populate({ path: "role", select: { _id: 1, name: 1 } });
    return user;
  }

  checkPassword(password, hash) {
    return compareSync(password, hash);
  }

  async update(updateUserDto: UpdateUserDto, user: IUser) {
    try {
      return await this.userModel.updateOne({
        _id: updateUserDto._id
      }, {
        ...updateUserDto,
        updatedBy: {
          _id: user._id,
          email: user.email
        }
      });
    } catch (error) {
      console.log(error);
      return "Không thể cập nhật thông tin cho người dùng này";
    }
  }

  async remove(id: string, user: IUser) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      const userDelete = await this.userModel.findById(id);
      if (userDelete.email === "nguyenmaianh@gmail.com") {
        throw new BadRequestException(`Không thể xóa tài khoản admin`);
      }

      await this.userModel.updateOne({
        _id: id
      }, {
        deletedBy: {
          _id: user._id,
          email: user.email
        }
      })
      return await this.userModel.softDelete({
        _id: id
      })
    }
    else {
      throw new BadRequestException("Id không hợp lệ");
    }
  }

  async updateRefreshToken(refresh_token, _id) {
    await this.userModel.updateOne({
      _id: _id
    }, {
      refreshToken: refresh_token
    })
  }

  getUserByToken = async (refresh_token) => {
    const user = await this.userModel.findOne({
      refreshToken: refresh_token
    }).populate({ path: "role", select: { name: 1 } });

    return user;
  }
}
