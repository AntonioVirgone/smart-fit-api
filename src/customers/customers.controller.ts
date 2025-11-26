import { Body, Controller, Post } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { ActivateUserDto } from './dto/activate-user.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  // ➤ Il trainer crea un nuovo utente
  @Post()
  create(@Body() dto: CreateCustomerDto) {
    return this.customersService.createCustomer(dto);
  }

  // ➤ L’utente attiva il proprio profilo
  @Post('activate')
  activate(@Body() dto: ActivateUserDto) {
    return this.customersService.activate(dto);
  }
}
