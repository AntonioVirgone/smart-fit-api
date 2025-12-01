import { Module } from '@nestjs/common';
import { CustomerProfileService } from './customer_profile.service';
import { CustomerProfileController } from './customer_profile.controller';

@Module({
  controllers: [CustomerProfileController],
  providers: [CustomerProfileService],
})
export class CustomerProfileModule {}
