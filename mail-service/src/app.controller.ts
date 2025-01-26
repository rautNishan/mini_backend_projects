import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { NodeMailerService } from './mail/node-mailer/services/node-mailer.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,private readonly _mailService:NodeMailerService) {}

  @Get()
  getHello(): string {
     this._mailService.sendMail();
    return this.appService.getHello();

  }
}
