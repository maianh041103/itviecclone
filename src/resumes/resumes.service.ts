import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateResumeDto, CreateUserCvDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { IUser } from 'src/users/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Resume, ResumeDocument } from './schemas/resume.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import aqp from 'api-query-params';
import mongoose from 'mongoose';

@Injectable()
export class ResumesService {
  constructor(@InjectModel(Resume.name) private resumeModel: SoftDeleteModel<ResumeDocument>) { }

  async create(CreateUserCvDto: CreateUserCvDto, user: IUser) {
    const { url, companyId, jobId } = CreateUserCvDto;

    let data = {
      email: user.email,
      userId: user._id,
      url: url,
      status: "PENDING",
      companyId: companyId,
      jobId: jobId,
      history: {
        status: "PENDING",
        updatedAt: new Date(),
        updatedBy: {
          _id: user._id,
          email: user.email
        }
      },
      createdBy: {
        _id: user._id,
        email: user.email
      }
    }

    const newResume = await this.resumeModel.create({ ...data });
    return {
      _id: newResume?._id,
      createdAd: newResume?.createdAt
    }
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    try {
      let { filter, sort, projection, population } = aqp(qs);
      delete filter.current;
      delete filter.pageSize;

      let defaultLimit = limit ? limit : 2;
      currentPage = currentPage ? currentPage : 1;
      let totalRecord = (await this.resumeModel.find(filter)).length;
      let totalPage = Math.ceil(totalRecord / defaultLimit);
      let skip = (currentPage - 1) * defaultLimit;

      if (!sort) {
        sort = "-updatedAt" as any;
      }
      const result = await this.resumeModel.find(filter)
        .skip(skip)
        .limit(defaultLimit)
        .sort(sort as any)
        .populate(population)
        .select(projection as any)
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
      throw new BadRequestException("Không tìm thấy danh sách CV");
    }
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`${id} không hợp lệ`);
    }
    const resume = await this.resumeModel.findById(id);
    return {
      resume
    }
  }

  async update(id: string, updateResumeDto: UpdateResumeDto, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new BadRequestException(`${id} không hợp lệ`);
    return await this.resumeModel.updateOne({
      _id: id
    }, {
      status: updateResumeDto.status,
      updateBy: {
        _id: user._id,
        email: user.email
      },
      $push: {
        history: {
          status: updateResumeDto.status,
          updatedAt: new Date(),
          updatedBy: {
            _id: user._id,
            email: user.email
          }
        }
      }
    })
  }

  async remove(id: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new BadRequestException(`${id} không hợp lệ`);
    await this.resumeModel.updateOne({
      _id: id
    }, {
      deletedBy: {
        _id: user._id,
        email: user.email
      }
    })
    return await this.resumeModel.softDelete({
      _id: id
    });
  }

  async getResumesByUser(user: IUser) {
    const resumes = await this.resumeModel.find({
      userId: user._id
    }).sort("-createdAt")
      .populate([
        {
          path: "companyId", select: { name: 1 }
        }, {
          path: "jobId", select: { name: 1 }
        }]);
    return await this.resumeModel.find({
      userId: user._id
    }).sort("-createdAt")
      .populate([
        {
          path: "companyId", select: { name: 1 }
        }, {
          path: "jobId", select: { name: 1 }
        }]);
  }
}
