import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { ActivateUserDto } from './dto/activate-user.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  // ➤ Il trainer crea un nuovo utente
  @Post(':trainerId')
  async create(
    @Param('trainerId') trainerId: string,
    @Body() dto: CreateCustomerDto,
  ) {
    return await this.customersService.createCustomer(trainerId, dto);
  }

  // ➤ L’utente attiva il proprio profilo
  @Patch('activate')
  activate(@Body() dto: ActivateUserDto) {
    return this.customersService.activate(dto);
  }

  @Get(':trainerId')
  async get(@Param('trainerId') trainerId: string) {
    return await this.customersService.findByTrainerId(trainerId);
  }
}
