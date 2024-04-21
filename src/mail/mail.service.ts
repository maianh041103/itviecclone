import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Job, JobDocument } from 'src/jobs/schemas/job.schema';
import { Subscriber, SubscriberDocument } from 'src/subscribers/schemas/subscriber.schema';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    @InjectModel(Subscriber.name) private subscriberModel: SoftDeleteModel<SubscriberDocument>,
    @InjectModel(Job.name) private jobModel: SoftDeleteModel<JobDocument>,
  ) { }

  public async sendEmail() {
    const listSubscribers = await this.subscriberModel.find({});
    for (const subscriber of listSubscribers) {
      const jobs = (await this.jobModel.find({
        skills: { $in: subscriber.skills }
      })).map(job => {
        return {
          name: job.name,
          company: job.company.name,
          salary: `${job.salary}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " đ",
          skills: job.skills
        }
      })

      await this.mailerService.sendMail({
        to: subscriber.email,
        from: "nguyenmaianh@gmail.com",
        subject: 'Testing Nest MailerModule ✔', // Subject line
        template: 'new-job',
        context: {
          name: subscriber.name,
          jobs: jobs
        }
      })
    }
  }

}
