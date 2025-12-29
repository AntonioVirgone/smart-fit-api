import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerProfileDto } from './dto/create-customer_profile.dto';
import { UpdateCustomerProfileDto } from './dto/update-customer_profile.dto';
import { CustomersService } from '../customers/customers.service';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class CustomerProfileService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly customerService: CustomersService,
  ) {}

  async create(
    customerId: string,
    createCustomerProfileDto: CreateCustomerProfileDto,
  ) {
    const user = await this.customerService.isActive(customerId);

    if (!user) {
      throw new NotFoundException('Utente non attivo');
    }

    return this.prisma.customerProfile.create({
      data: {
        customerId: customerId,
        name: createCustomerProfileDto.name,
        lastname: createCustomerProfileDto.lastname,
        age: createCustomerProfileDto.age,
        weight: createCustomerProfileDto.weight,
        height: createCustomerProfileDto.height,
      },
    });
  }

  findAll() {
    return this.prisma.customerProfile.findMany({
      include: { customer: true },
    });
  }

  findOne(id: string) {
    return this.prisma.customerProfile.findUnique({
      where: { id },
      include: { customer: true },
    });
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
