import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { ActivateCustomerDto } from './dto/activate-customer.dto';
import { LoginCustomerDto } from './dto/login-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}


  // ➤ L’utente attiva il proprio profilo
  @Patch('activate')
  activate(@Body() dto: ActivateCustomerDto) {
    console.log('activate');
    return this.customersService.activate(dto);
  }

  @Get(':trainerId')
  get(@Param('trainerId') trainerId: string) {
    return this.customersService.findByTrainerId(trainerId);
  }

  @Post('/login')
  async login(@Body() dto: LoginCustomerDto) {
    console.log('login');
    return await this.customersService.findOneByUsernameAndPassword(dto);
  }
}
