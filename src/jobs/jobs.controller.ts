import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/user.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Job')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) { }

  @Post()
  @ResponseMessage("Create a new job")
  create(@Body() createJobDto: CreateJobDto, @User() user: IUser) {
    return this.jobsService.create(createJobDto, user);
  }

  @Get()
  @ResponseMessage("Fetch jobs with pagination")
  @Public()
  findAll(@Query("current") currentPage: string, @Query("pageSize") pageSize: string, @Query() qs: string) {
    return this.jobsService.findAll(+currentPage, +pageSize, qs);
  }

  @Get(':id')
  @ResponseMessage("Fetch job by id")
  @Public()
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage("Update a job")
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto, @User() user: IUser) {
    return this.jobsService.update(id, updateJobDto, user);
  }

  @Delete(':id')
  @ResponseMessage("Delete a job")
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.jobsService.remove(id, user);
  }
}
