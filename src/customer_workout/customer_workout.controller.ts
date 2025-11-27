// customer_workout.controller.ts
import { Controller, Post, Body, Delete, Param, Get } from '@nestjs/common';
import { CustomerWorkoutService } from './customer_workout.service';
import { CreateCustomerWorkoutDto } from './dto/create-customer_workout.dto';

@Controller('customer-workouts')
export class CustomerWorkoutController {
  constructor(private readonly service: CustomerWorkoutService) {}

  @Post()
  assign(@Body() dto: CreateCustomerWorkoutDto) {
    return this.service.assign(dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.removeAssociation(id);
  }

  @Get('customer/:customerId')
  findByCustomer(@Param('customerId') customerId: string) {
    return this.service.findByCustomer(customerId);
  }
}
