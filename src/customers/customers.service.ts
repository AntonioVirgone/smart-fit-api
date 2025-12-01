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
    private readonly customRepo: Repository<Customer>,
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
  async createCustomer(dto: CreateCustomerDto) {
    const activationCode = this.generateActivationCode();

    const user = this.customRepo.create({
      name: dto.name,
      activationCode,
      status: 'pending',
    });

    await this.customRepo.save(user);

    return {
      customerId: user.id,
      activationCode,
    };
  }

  // ➤ L’utente inserisce il codice e attiva l’account
  async activate(dto: ActivateUserDto) {
    const user = await this.customRepo.findOne({
      where: { activationCode: dto.activationCode },
    });

    if (!user) {
      throw new NotFoundException('Codice di attivazione non valido');
    }

    const token = this.generateActivationToken();

    user.activationToken = token;
    user.activationCode = null;
    user.status = 'active';

    await this.customRepo.save(user);

    return { activationToken: token };
  }

  // ➤ Per guard custom (trova utente tramite token)
  async findByToken(token: string): Promise<Customer | null> {
    return this.customRepo.findOne({
      where: { activationToken: token },
    });
  }
}
