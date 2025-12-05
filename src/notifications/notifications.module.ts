import { Global, Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { ApnsService } from './providers/apns.service';

@Global()
@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService, ApnsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
