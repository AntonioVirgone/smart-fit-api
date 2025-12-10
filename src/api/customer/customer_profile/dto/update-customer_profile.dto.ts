import { PartialType } from '@nestjs/swagger';
import { CreateCustomerProfileDto } from './create-customer_profile.dto';

export class UpdateCustomerProfileDto extends PartialType(
  CreateCustomerProfileDto,
) {}
