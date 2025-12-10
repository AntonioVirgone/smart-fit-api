import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { LoginTrainerDto } from './dto/login-trainer.dto';
import { CreateCustomerDto } from '../../customer/customers/dto/create-customer.dto';

@Injectable()
export class TrainerService {
  constructor(private prisma: PrismaService) {}

  create(createTrainerDto: CreateTrainerDto) {
    return this.prisma.trainer.create({
      data: createTrainerDto,
    });
  }

  findAll() {
    return this.prisma.trainer.findMany({
      include: { customers: true },
    });
  }

  findOne(id: string) {
    return this.prisma.trainer.findFirst({
      where: { id },
      include: { customers: true },
    });
  }

  async findOneByUsernameAndPassword(loginTrainerDto: LoginTrainerDto) {
    return this.prisma.trainer.findFirst({
      where: {
        name: loginTrainerDto.name,
        password: loginTrainerDto.password,
      },
    });
  }

  update(id: string, updateTrainerDto: UpdateTrainerDto) {
    return this.prisma.trainer.update({
      where: { id },
      data: updateTrainerDto,
    });
  }

  remove(id: string) {
    return this.prisma.trainer.delete({
      where: { id },
    });
  }

  // ➤ Genera codice di attivazione (tipo ABC123)
  private generateActivationCode(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  // ➤ Il trainer crea un nuovo utente
  async createCustomer(trainerId: string, dto: CreateCustomerDto) {
    const promise = await this.prisma.customer.findMany({
      where: { email: dto.email },
    });
    if (promise.length > 0) {
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
}
