// customer_workout.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerWorkoutDto } from './dto/create-customer_workout.dto';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class CustomerWorkoutService {
  constructor(private readonly prisma: PrismaService) {}

  async assign(dto: CreateCustomerWorkoutDto) {
    const customer = await this.prisma.customer.findUnique({
      where: { id: dto.customerCode },
      select: { id: true, status: true },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    if (customer.status !== 'active') {
      throw new NotFoundException('Customer not active');
    }

    const workout = await this.prisma.workout.findUnique({
      where: { id: dto.workoutCode },
      select: { id: true },
    });

    if (!workout) {
      throw new NotFoundException('Workout not found');
    }

    // assegna workout al customer
    const customerWorkout = await this.prisma.customerWorkout.create({
      data: {
        customerId: dto.customerCode,
        workoutId: dto.workoutCode,
      },
    });

    // restituisci workout completo
    return this.prisma.customerWorkout.findUnique({
      where: { id: customerWorkout.id },
      include: {
        workout: {
          include: {
            workoutPlans: {
              orderBy: { order: 'asc' },
              include: {
                plan: {
                  include: {
                    planExercises: {
                      orderBy: { order: 'asc' },
                      include: {
                        exercise: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
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
        workout: {
          include: {
            workoutPlans: {
              orderBy: { order: 'asc' },
              include: {
                plan: {
                  include: {
                    planExercises: {
                      orderBy: { order: 'asc' },
                      include: {
                        exercise: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }
}
