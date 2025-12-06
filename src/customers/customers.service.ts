import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ActivateCustomerDto } from './dto/activate-customer.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { PrismaService } from '../prisma/prisma.service';
import crypto from 'crypto';
import { LoginCustomerDto } from './dto/login-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}

  // ➤ Genera codice di attivazione (tipo ABC123)
  private generateActivationCode(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  // ➤ Genera activation token definitivo (UUID)
  private generateActivationToken(): string {
    return crypto.randomUUID();
  }

  // ➤ Il trainer crea un nuovo utente
  async createCustomer(trainerId: string, dto: CreateCustomerDto) {
    if ((await this.findByEmail(dto.email)) != null) {
      throw new BadRequestException('Email already exists');
    }
    const activationCode = this.generateActivationCode();

    const customer = await this.prisma.customer.create({
      data: {
        trainerId: trainerId,
        name: dto.name,
        email: dto.email,
        phone: dto.phoneNumber,
        activationCode,
        status: 'pending',
      },
    });

    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phoneNumber: customer.phone,
      activationCode,
    };
  }

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

  async findByEmail(email: string) {
    return this.prisma.customer.findMany({
      where: { email: email },
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
