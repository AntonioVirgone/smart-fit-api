import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerProfileDto } from './dto/create-customer_profile.dto';
import { UpdateCustomerProfileDto } from './dto/update-customer_profile.dto';
import { CustomersService } from '../customers/customers.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CustomerProfileService {
  constructor(
    private readonly prisma: PrismaService,
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

    return this.prisma.customerProfile.create({
      data: {
        customerCode: customerCode,
        name: createCustomerProfileDto.name,
        lastname: createCustomerProfileDto.lastname,
        email: createCustomerProfileDto.email,
        phone: createCustomerProfileDto.phone,
        age: createCustomerProfileDto.age,
        weight: createCustomerProfileDto.weight,
        height: createCustomerProfileDto.height,
      },
    });
  }

  findAll() {
    return this.prisma.customerProfile.findMany();
  }

  findOne(id: string) {
    return this.prisma.customerProfile.findUnique({ where: { id } });
  }

  update(id: string, updateCustomerProfileDto: UpdateCustomerProfileDto) {
    return this.prisma.customerProfile.update({
      where: { id },
      data: updateCustomerProfileDto,
    });
  }

  remove(id: string) {
    return this.prisma.customerProfile.delete({ where: { id } });
  }
}
