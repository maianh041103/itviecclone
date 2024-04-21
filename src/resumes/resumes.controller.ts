import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ResumesService } from './resumes.service';
import { CreateResumeDto, CreateUserCvDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { ResponseMessage, SkipCheckPermission, User } from 'src/decorator/customize';
import { IUser } from 'src/users/user.interface';

@Controller('resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) { }

  @Post()
  @SkipCheckPermission()
  @ResponseMessage("Create a new resume")
  create(@Body() createResumeDto: CreateUserCvDto, @User() user: IUser) {
    return this.resumesService.create(createResumeDto, user);
  }

  @Get()
  @SkipCheckPermission()
  @ResponseMessage("Fetch all resumes with paginate")
  findAll(@Query("current") current: string, @Query("pageSize") pageSize: string,
    @Query() qs: string) {
    return this.resumesService.findAll(+current, +pageSize, qs);
  }

  @Get(':id')
  @SkipCheckPermission()
  @ResponseMessage("Fetch a resume by id")
  findOne(@Param('id') id: string) {
    return this.resumesService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage("Update status resume")
  update(@Param('id') id: string, @Body() updateResumeDto: UpdateResumeDto, @User() user: IUser) {
    return this.resumesService.update(id, updateResumeDto, user);
  }

  @Delete(':id')
  @ResponseMessage("Delete a resume by id")
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.resumesService.remove(id, user);
  }

  @Post('by-user')
  @SkipCheckPermission()
  @ResponseMessage("Get Resumes by user")
  getResumesByUser(@User() user: IUser) {
    return this.resumesService.getResumesByUser(user);
  }
}
