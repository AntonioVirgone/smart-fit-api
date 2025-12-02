import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { ActivateUserDto } from './dto/activate-user.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  // ➤ Il trainer crea un nuovo utente
  @Post(':trainerCode')
  async create(
    @Param('trainerCode') trainerCode: string,
    @Body() dto: CreateCustomerDto,
  ) {
    return await this.customersService.createCustomer(trainerCode, dto);
  }

  // ➤ L’utente attiva il proprio profilo
  @Patch('activate')
  activate(@Body() dto: ActivateUserDto) {
    return this.customersService.activate(dto);
  }

  @Get(':trainerCode')
  async get(@Param('trainerCode') trainerCode: string) {
    return await this.customersService.findByTrainerCode(trainerCode);
  }
}
