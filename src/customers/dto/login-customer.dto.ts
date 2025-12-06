import { IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer.dto';

export class LoginCustomerDto extends PartialType(CreateCustomerDto) {
  @IsString()
  @IsNotEmpty()
  password: string;
}
