import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { SendEmailDto } from './dto/send-mail.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  @HttpCode(HttpStatus.CREATED)
  async sendEmail(@Body() body: SendEmailDto) {
    const result = await this.mailService.sendTestEmail(body.to, 'pippo');

    return {
      message: 'Email inviata correttamente!',
      data: result,
    };
  }
}
