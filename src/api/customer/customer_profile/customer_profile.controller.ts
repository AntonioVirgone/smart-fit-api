import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CustomerProfileService } from './customer_profile.service';
import { CreateCustomerProfileDto } from './dto/create-customer_profile.dto';
import { UpdateCustomerProfileDto } from './dto/update-customer_profile.dto';

@Controller('customer-profile')
export class CustomerProfileController {
  constructor(
    private readonly customerProfileService: CustomerProfileService,
  ) {}

  @Post(':customerId')
  create(
    @Param('customerId') customerId: string,
    @Body() createCustomerProfileDto: CreateCustomerProfileDto,
  ) {
    return this.customerProfileService.create(
      customerId,
      createCustomerProfileDto,
    );
  }

  @Get()
  findAll() {
    return this.customerProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerProfileService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerProfileDto: UpdateCustomerProfileDto,
  ) {
    return this.customerProfileService.update(id, updateCustomerProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerProfileService.remove(id);
  }
}
