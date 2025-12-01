import { Injectable } from '@nestjs/common';
import { CreateCustomerProfileDto } from './dto/create-customer_profile.dto';
import { UpdateCustomerProfileDto } from './dto/update-customer_profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerProfile } from './entities/customer_profile.entity';

@Injectable()
export class CustomerProfileService {
  constructor(
    @InjectRepository(CustomerProfile)
    private readonly customerProfileRepository: Repository<CustomerProfile>,
  ) {}

  async create(createCustomerProfileDto: CreateCustomerProfileDto) {
    await this.customerProfileRepository.save(createCustomerProfileDto);
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
