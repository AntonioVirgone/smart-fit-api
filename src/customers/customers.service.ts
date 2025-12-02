import { Injectable, NotFoundException } from '@nestjs/common';
import { ActivateUserDto } from './dto/activate-user.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Customer } from '@prisma/client';
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
  async createCustomer(trainerCode: string, dto: CreateCustomerDto) {
    const activationCode = this.generateActivationCode();
    const activationToken = this.generateActivationToken();

    const customer = await this.prisma.customer.create({
      data: {
        trainerId: trainerCode,
        name: dto.name,
        activationCode,
        activationToken,
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

    const token = this.generateActivationToken();

    await this.prisma.customer.update({
      where: { id: user.id },
      data: {
        activationToken: token,
        activationCode: null,
        status: 'active',
      },
    });

    return { activationToken: token };
  }

  async isActive(code: string) {
    return await this.prisma.customer.findFirst({
      where: { id: code, status: 'active' },
    });
  }

  // ➤ Per guard custom (trova utente tramite token)
  async findByToken(token: string): Promise<Customer | null> {
    return await this.prisma.customer.findFirst({
      where: { activationToken: token },
    });
  }

  async findByTrainerCode(trainerCode: string) {
    return await this.prisma.customer.findMany({
      where: { trainerId: trainerCode },
    });
  }
}
