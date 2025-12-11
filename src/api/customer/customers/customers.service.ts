import { Injectable, NotFoundException } from '@nestjs/common';
import { ActivateCustomerDto } from './dto/activate-customer.dto';
import { PrismaService } from '../../../prisma/prisma.service';
import { LoginCustomerDto } from './dto/login-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}

  // ➤ L’utente inserisce il codice e attiva l’account
  async activate(dto: ActivateCustomerDto) {
    const user = await this.prisma.customer.findFirst({
      where: { email: dto.email, activationCode: dto.activationCode },
    });

    if (!user) {
      throw new NotFoundException('Codice di attivazione non valido');
    }

    return this.prisma.customer.update({
      where: { id: user.id },
      data: {
        status: 'active',
      },
    });
  }

  async updateStatus(id: string, status: string) {
    const customer = await this.prisma.customer.findFirst({
      where: { id: id },
    });
    if (!customer) {
      throw new NotFoundException('Customer not exists');
    }

    return this.prisma.customer.update({
      where: { id: customer.id },
      data: {
        status: status,
      },
    });
  }

  async isActive(code: string) {
    return this.prisma.customer.findFirst({
      where: { id: code, status: 'active' },
    });
  }

  findByTrainerId(trainerId: string) {
    return this.prisma.customer.findMany({
      where: { trainerId: trainerId },
    });
  }

  async findOneByUsernameAndPassword(loginCustomerDto: LoginCustomerDto) {
    console.log('findOneByUsernameAndPassword called');
    const customer = await this.prisma.customer.findFirst({
      where: {
        email: loginCustomerDto.email,
      },
    });

    if (!customer) {
      throw new NotFoundException('Codice di attivazione non valido');
    }

    return customer;
  }
}
