import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, Version } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/user.interface';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Company')
@Controller('companies')
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService
  ) { }

  @Post()
  @ResponseMessage('Fetched Stats Succesfully')
  create(@Body() createCompanyDto: CreateCompanyDto, @Req() req: Request, @User() user: IUser) {
    //@User : req.user
    return this.companyService.create(createCompanyDto, user);
  }

  @Get()
  @Public()
  @ResponseMessage("Fetch companies")
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query() qs: string
  ) {
    return this.companyService.findAll(+currentPage, +limit, qs);
  }

  @Get(':id')
  @Public()
  @ResponseMessage('Find company by id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto, @User() user: IUser) {
    return this.companyService.update(id, updateCompanyDto, user);
  }

  @Version('1') //chỉ có thể áp dụng với mỗi v1
  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.companyService.remove(id, user);
  }
}
