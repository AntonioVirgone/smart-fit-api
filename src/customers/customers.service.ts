import { Injectable, NotFoundException } from '@nestjs/common';
import { ActivateUserDto } from './dto/activate-user.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { PrismaService } from '../prisma/prisma.service';
import crypto from 'crypto';

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
    const activationCode = this.generateActivationCode();

    const customer = await this.prisma.customer.create({
      data: {
        trainerId: trainerId,
        name: dto.name,
        activationCode,
        status: 'pending',
      },
    });

    return {
      id: customer.id,
      name: customer.name,
      activationCode,
    };
  }

  // ➤ L’utente inserisce il codice e attiva l’account
  async activate(dto: ActivateUserDto) {
    const user = await this.prisma.customer.findFirst({
      where: { id: dto.customerCode, activationCode: dto.activationCode },
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

  async findByTrainerId(trainerId: string) {
    return this.prisma.customer.findMany({
      where: { trainerId: trainerId },
    });
  }
}
