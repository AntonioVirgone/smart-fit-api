import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RegisterDeviceTokenDto } from './dto/register-device-token.dto';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private notifications: NotificationsService) {}

  @Post('register/:customerId')
  registerToken(
    @Param('customerId') customerId: string,
    @Body() dto: RegisterDeviceTokenDto,
  ) {
    console.log('api register request');
    return this.notifications.registerDeviceToken(customerId, dto);
  }

  @Get(':customerId')
  sendNotification(@Param('customerId') customerId: string) {
    return this.notifications.sendWorkoutAssignedNotification(
      customerId,
      'hello word',
    );
  }
}
