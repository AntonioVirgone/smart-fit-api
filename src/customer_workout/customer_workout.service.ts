// customer_workout.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerWorkoutDto } from './dto/create-customer_workout.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CustomerWorkoutService {
  constructor(private readonly prisma: PrismaService) {}

  async assign(dto: CreateCustomerWorkoutDto) {
    const customer = await this.prisma.customer.findUnique({
      where: { id: dto.customerCode },
    });
    if (!customer) throw new NotFoundException('Customer not found');

    if (customer.status !== 'active')
      throw new NotFoundException('Customer not active');

    const workout = await this.prisma.workout.findUnique({
      where: { id: dto.workoutCode },
    });
    if (!workout) throw new NotFoundException('Workout not found');

    return this.prisma.customerWorkout.create({
      data: {
        customer: { connect: { id: dto.customerCode } },
        workout: { connect: { id: dto.workoutCode } },
      },
      include: {
        workout: { include: { plans: { include: { exercises: true } } } },
      },
    });
  }

  async removeAssociation(id: string) {
    const assoc = await this.prisma.customerWorkout.findUnique({
      where: { id },
    });
    if (!assoc) throw new NotFoundException('Association not found');

    await this.prisma.customerWorkout.delete({ where: { id } });
    return { deleted: true };
  }

  async findByCustomer(customerId: string) {
    return this.prisma.customerWorkout.findMany({
      where: { customerId },
      include: {
        workout: { include: { plans: { include: { exercises: true } } } },
      },
    });
  }
}
