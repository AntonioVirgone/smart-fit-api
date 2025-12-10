// customer_workout.controller.ts
import { Controller, Post, Body, Delete, Param, Get } from '@nestjs/common';
import { CustomerWorkoutService } from './customer_workout.service';
import { CreateCustomerWorkoutDto } from './dto/create-customer_workout.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('customer-workouts')
export class CustomerWorkoutController {
  constructor(private readonly service: CustomerWorkoutService) {}

  @Post()
  @ApiOperation({ summary: 'Assign customer to workout' })
  assign(@Body() dto: CreateCustomerWorkoutDto) {
    return this.service.assign(dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove customer to workout' })
  remove(@Param('id') id: string) {
    return this.service.removeAssociation(id);
  }

  @Get('customer/:customerId')
  @ApiOperation({ summary: 'Find workout associated to customer' })
  findByCustomer(@Param('customerId') customerId: string) {
    return this.service.findByCustomer(customerId);
  }
}
