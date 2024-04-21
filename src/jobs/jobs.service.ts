import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Job, JobDocument } from './schemas/job.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/user.interface';
import mongoose from 'mongoose';
import aqp from 'api-query-params';

@Injectable()
export class JobsService {
  constructor(@InjectModel(Job.name) private jobModel: SoftDeleteModel<JobDocument>) { }

  async create(createJobDto: CreateJobDto, user: IUser) {
    const newJob = await this.jobModel.create(
      {
        ...createJobDto,
        createdBy: {
          _id: user._id,
          email: user.email
        }
      })

    return {
      _id: newJob._id,
      createdAt: newJob.createdAt
    }
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    try {
      let { filter, sort, projection, population } = aqp(qs);
      delete filter.current;
      delete filter.pageSize;

      let defaultLimit = limit ? limit : 2;
      let totalRecord = (await this.jobModel.find(filter)).length;
      let totalPage = Math.ceil(totalRecord / defaultLimit);
      let skip = (currentPage - 1) * defaultLimit;

      if (!sort) {
        sort = "-updatedAt" as any;
      }
      const result = await this.jobModel.find(filter)
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
      throw new BadRequestException("Không tìm thấy danh sách công việc");
    }
  }

  async findOne(id: string) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      return await this.jobModel.findOne({
        _id: id
      });
    } else {
      return {
        "error": "Id không hợp lệ"
      }
    }
  }

  async update(id: string, updateJobDto: UpdateJobDto, user: IUser) {
    try {
      if (mongoose.Types.ObjectId.isValid(id)) {
        return await this.jobModel.updateOne({
          _id: id
        }, {
          ...updateJobDto,
          updatedBy: {
            _id: user._id,
            email: user.email
          }
        })
      } else {
        return {
          "error": "Id không hợp lệ"
        }
      }
    } catch (error) {
      console.log(error);
      return {
        "error": "Id không hợp lệ"
      }
    }
  }

  async remove(id: string, user: IUser) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      await this.jobModel.updateOne({
        _id: id
      }, {
        deletedBy: {
          _id: user._id,
          email: user.email
        }
      });

      return await this.jobModel.softDelete({
        _id: id
      });
    } else {
      return {
        "error": "Id không hợp lệ"
      }
    }
  }
}
