import { Module } from '@nestjs/common';
import { CustomerProfileService } from './customer_profile.service';
import { CustomerProfileController } from './customer_profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerProfile } from './entities/customer_profile.entity';
import { CustomersService } from '../customers/customers.service';
import { Customer } from '../customers/entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerProfile, Customer])],
  controllers: [CustomerProfileController],
  providers: [CustomerProfileService, CustomersService],
  exports: [CustomerProfileService],
})
export class CustomerProfileModule {}
