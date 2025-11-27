// customer_workout.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Workout } from '../workout/entities/workout.entity';
import { CustomerWorkout } from './entities/customer_workout.entity';
import { Customer } from '../customers/entities/customer.entity';
import { CreateCustomerWorkoutDto } from './dto/create-customer_workout.dto';

@Injectable()
export class CustomerWorkoutService {
  constructor(
    @InjectRepository(CustomerWorkout)
    private readonly cwRepo: Repository<CustomerWorkout>,
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
    @InjectRepository(Workout)
    private readonly workoutRepo: Repository<Workout>,
  ) {}

  async assign(dto: CreateCustomerWorkoutDto) {
    const customer = await this.customerRepo.findOne({
      where: { id: dto.customerId },
    });
    if (!customer) throw new NotFoundException('Customer not found');

    const workout = await this.workoutRepo.findOne({
      where: { id: dto.workoutId },
    });
    if (!workout) throw new NotFoundException('Workout not found');

    const association = this.cwRepo.create({ customer, workout });
    return this.cwRepo.save(association);
  }

  async removeAssociation(id: string) {
    const assoc = await this.cwRepo.findOne({ where: { id } });
    if (!assoc) throw new NotFoundException('Association not found');

    await this.cwRepo.remove(assoc);
    return { deleted: true };
  }

  async findByCustomer(customerId: string) {
    return this.cwRepo.find({
      where: { customer: { id: customerId } },
      relations: ['workout'],
    });
  }
}
