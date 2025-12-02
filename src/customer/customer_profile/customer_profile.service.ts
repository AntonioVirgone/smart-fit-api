import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerProfileDto } from './dto/create-customer_profile.dto';
import { UpdateCustomerProfileDto } from './dto/update-customer_profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerProfile } from './entities/customer_profile.entity';
import { CustomersService } from '../customers/customers.service';

@Injectable()
export class CustomerProfileService {
  constructor(
    @InjectRepository(CustomerProfile)
    private readonly customerProfileRepository: Repository<CustomerProfile>,
    private readonly customerService: CustomersService,
  ) {}

  async create(
    customerCode: string,
    createCustomerProfileDto: CreateCustomerProfileDto,
  ) {
    const user = await this.customerService.isActive(customerCode);

    if (!user) {
      throw new NotFoundException('Utente non attivo');
    }

    const customerProfile = this.customerProfileRepository.create({
      customerCode: customerCode,
      name: createCustomerProfileDto.name,
      lastname: createCustomerProfileDto.lastname,
      email: createCustomerProfileDto.email,
      phone: createCustomerProfileDto.phone,
      age: createCustomerProfileDto.age,
      weight: createCustomerProfileDto.weight,
      height: createCustomerProfileDto.height,
    });

    await this.customerProfileRepository.save(customerProfile);
  }

  findAll() {
    return `This action returns all customerProfile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customerProfile`;
  }

  update(id: number, updateCustomerProfileDto: UpdateCustomerProfileDto) {
    return `This action updates a #${id} customerProfile`;
  }

  remove(id: number) {
    return `This action removes a #${id} customerProfile`;
  }
}
