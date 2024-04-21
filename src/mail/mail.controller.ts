import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';
import { ResponseMessage, SkipCheckPermission } from 'src/decorator/customize';
import { Cron } from '@nestjs/schedule';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Mail')
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) { }

  @SkipCheckPermission()
  @Get()
  @ResponseMessage("Send Email")
  @Cron('* 0 0 * * 0')
  sendEmail() {
    this.mailService.sendEmail();
  }
}
