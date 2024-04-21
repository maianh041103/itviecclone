import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Subscriber, SubscriberDocument } from './schemas/subscriber.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/user.interface';
import mongoose from 'mongoose';
import aqp from 'api-query-params';

@Injectable()
export class SubscribersService {
  constructor(
    @InjectModel(Subscriber.name) private subscribeModel: SoftDeleteModel<SubscriberDocument>
  ) { }

  async create(createSubscriberDto: CreateSubscriberDto, user: IUser) {
    const { email, name, skills } = createSubscriberDto;

    const emailExist = await this.subscribeModel.findOne({
      email: email
    });
    if (emailExist) {
      throw new BadRequestException(`${email} đã đăng ký`);
    }

    const newSubscriber = await this.subscribeModel.create({
      email, name, skills,
      createdBy: {
        _id: user._id,
        email: user.email
      }
    });
    return {
      _id: newSubscriber._id,
      createdAt: newSubscriber.createdAt
    }
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    try {
      let { filter, sort, projection, population } = aqp(qs);
      delete filter.current;
      delete filter.pageSize;

      let defaultLimit = limit ? limit : 2;
      let totalRecord = (await this.subscribeModel.find(filter)).length;
      let totalPage = Math.ceil(totalRecord / defaultLimit);
      let skip = (currentPage - 1) * defaultLimit;

      if (!sort) {
        sort = "-updatedAt" as any;
      }
      const result = await this.subscribeModel.find(filter)
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
      throw new BadRequestException("Không tìm thấy danh sách subscribers");
    }
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new BadRequestException("Id không hợp lệ");
    return await this.subscribeModel.findOne({
      _id: id
    });
  }

  async update(updateSubscriberDto: UpdateSubscriberDto, user: IUser) {

    return await this.subscribeModel.updateOne({
      email: user.email
    }, {
      ...updateSubscriberDto,
      updatedBy: {
        _id: user._id,
        email: user.email
      }
    },
      { upsert: true }); //update and insert
  }

  async remove(id: string, user: IUser) {
    await this.subscribeModel.updateOne({
      _id: id
    }, {
      deletedBy: {
        _id: user._id,
        email: user.email
      }
    })
    return await this.subscribeModel.softDelete({
      _id: id
    });
  }

  async getSkills(user: IUser) {
    return await this.subscribeModel.findOne({
      email: user.email
    }, {
      skills: 1
    })
  }
}
