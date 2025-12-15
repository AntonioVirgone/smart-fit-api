import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { LoginTrainerDto } from './dto/login-trainer.dto';
import { CreateCustomerDto } from '../../customer/customers/dto/create-customer.dto';

@Controller('trainer')
export class TrainerController {
  constructor(private readonly trainerService: TrainerService) {}

  @Post()
  create(@Body() dto: CreateTrainerDto) {
    return this.trainerService.create(dto);
  }

  @Get()
  findAll() {
    return this.trainerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trainerService.findOne(id);
  }

  @Post('login')
  async login(@Body() dto: LoginTrainerDto) {
    return await this.trainerService.findOneByUsernameAndPassword(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTrainerDto) {
    console.log('update', id);
    return this.trainerService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trainerService.remove(id);
  }

  // ➤ Il trainer crea un nuovo utente
  @Post(':trainerId/customers')
  async createCustomer(
    @Param('trainerId') trainerId: string,
    @Body() dto: CreateCustomerDto,
  ) {
    console.log('create');
    return await this.trainerService.createCustomer(trainerId, dto);
  }

  @Patch(':trainerId/customer/:customerId')
  async disableCustomer(
    @Param('trainerId') trainerId: string,
    @Param('customerId') customerId: string,
  ) {
    console.log('disable');
    return await this.trainerService.disableCustomer(trainerId, customerId);
  }

  @Patch(':trainerId/customer/:customerId/regenerate-code')
  async generateCode(
    @Param('trainerId') trainerId: string,
    @Param('customerId') customerId: string,
  ) {
    console.log('generateCode');
    return await this.trainerService.generateCode(trainerId, customerId);
  }

  @Get(':trainerId/customers')
  async get(@Param('trainerId') trainerId: string) {
    return this.trainerService.findAllCustomerByTrainerId(trainerId);
  }
}
