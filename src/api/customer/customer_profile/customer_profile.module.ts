import { Module } from '@nestjs/common';
import { CustomerProfileService } from './customer_profile.service';
import { CustomerProfileController } from './customer_profile.controller';
import { CustomersModule } from '../customers/customers.module';

@Module({
  imports: [CustomersModule],
  controllers: [CustomerProfileController],
  providers: [CustomerProfileService],
  exports: [CustomerProfileService],
})
export class CustomerProfileModule {}
