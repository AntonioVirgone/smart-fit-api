import { Module } from '@nestjs/common';
import { CustomerProfileService } from './customer_profile.service';
import { CustomerProfileController } from './customer_profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerProfile } from './entities/customer_profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerProfile])],
  controllers: [CustomerProfileController],
  providers: [CustomerProfileService],
  exports: [CustomerProfileService],
})
export class CustomerProfileModule {}
