import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Company, CompanyDocument } from './schema/company.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/user.interface';
import mongoose from 'mongoose';
import aqp from 'api-query-params';
import { isEmpty } from 'class-validator';

@Injectable()
export class CompanyService {
  constructor(@InjectModel(Company.name) private CompanyModel: SoftDeleteModel<CompanyDocument>) { }

  async create(createCompanyDto: CreateCompanyDto, user: IUser) {
    const company: CreateCompanyDto = await this.CompanyModel.create({
      ...createCompanyDto,
      createdBy: {
        _id: user._id,
        email: user.email
      }
    });
    return company;
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    let { filter, sort, projection, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    let defaultLimit = limit ? limit : 10;
    let offset = (currentPage - 1) * defaultLimit;
    const totalItems = (await this.CompanyModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    if (isEmpty(sort)) {
      sort = "-updatedAt" as any;
    }

    const result = await this.CompanyModel.find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate(population).exec();

    return {
      meta: {
        current: currentPage, //trang hiện tại 
        pageSize: limit, //số lượng bản ghi đã lấy 
        pages: totalPages, //tổng số trang với điều kiện query 
        total: totalItems // tổng số phần tử (số bản ghi)
      },
      result //kết quả query
    }

  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`${id} là id không hợp lệ`);
    }
    const company = await this.CompanyModel.findById(id);
    return company;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`${id} là id không hợp lệ`);
    }
    return await this.CompanyModel.updateOne({
      _id: id
    }, {
      ...updateCompanyDto,
      updatedBy: {
        _id: user._id,
        email: user.email
      }
    })
  }

  async remove(id: string, user: IUser) {
    await this.CompanyModel.updateOne({
      _id: id
    }, {
      deletedBy: {
        _id: user._id,
        email: user.email
      }
    })
    return await this.CompanyModel.softDelete({
      _id: id
    });
  }
}
