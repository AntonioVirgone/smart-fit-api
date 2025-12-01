import { Injectable, NotFoundException } from '@nestjs/common';
import { ActivateUserDto } from './dto/activate-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

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

    const customer = this.customerRepository.create({
      trainerCode: trainerCode,
      name: dto.name,
      activationCode: activationCode,
      activationToken: activationToken,
      status: 'pending',
    });

    await this.customerRepository.save(customer);

    return {
      customerCode: customer.id,
      activationCode,
    };
  }

  // ➤ L’utente inserisce il codice e attiva l’account
  async activate(dto: ActivateUserDto) {
    const user = await this.customerRepository.findOne({
      where: { id: dto.customerCode, activationCode: dto.activationCode },
    });

    if (!user) {
      throw new NotFoundException('Codice di attivazione non valido');
    }

    const token = this.generateActivationToken();

    user.activationToken = token;
    user.activationCode = null;
    user.status = 'active';

    await this.customerRepository.save(user);

    return { activationToken: token };
  }

  async isActive(code: string) {
    return await this.customerRepository.findOne({
      where: { id: code, status: 'active' },
    });
  }

  // ➤ Per guard custom (trova utente tramite token)
  async findByToken(token: string): Promise<Customer | null> {
    return await this.customerRepository.findOne({
      where: { activationToken: token },
    });
  }

  async findByTrainerCode(trainerCode: string) {
    return await this.customerRepository.find({
      where: { trainerCode: trainerCode },
    });
  }
}
