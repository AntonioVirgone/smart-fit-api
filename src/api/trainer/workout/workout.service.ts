import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkoutByPlanCodeDto } from './dto/create-workout-by-plan-code.dto';
import { AddPlanDto } from './dto/add-plan.dto';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class WorkoutService {
  constructor(private readonly prisma: PrismaService) {}

  async createWorkoutByPlanCode(dto: CreateWorkoutByPlanCodeDto) {
    // 1️⃣ verifica che i plan esistano
    const plans = await this.prisma.plan.findMany({
      where: { id: { in: dto.plans } },
      select: { id: true },
    });

    const foundPlanIds = plans.map((p) => p.id);
    const missingPlans = dto.plans.filter((id) => !foundPlanIds.includes(id));

    if (missingPlans.length) {
      throw new NotFoundException(
        `Plan with id ${missingPlans.join(', ')} not found`,
      );
    }

    // 2️⃣ crea workout
    const workout = await this.prisma.workout.create({
      data: {
        name: dto.name,
      },
    });

    // 3️⃣ collega workout ↔ plan (join table)
    await this.prisma.workoutPlan.createMany({
      data: dto.plans.map((planId, index) => ({
        workoutId: workout.id,
        planId,
        order: index,
      })),
    });

    // 4️⃣ restituisci workout completo
    return this.prisma.workout.findUnique({
      where: { id: workout.id },
      include: {
        workoutPlans: {
          orderBy: { order: 'asc' },
          include: {
            plan: {
              include: {
                planExercises: {
                  orderBy: { order: 'asc' },
                  include: { exercise: true },
                },
              },
            },
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.workout.findMany({
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
    });
  }

  async removeAll() {
    return await this.prisma.workout.deleteMany();
  }

  async addPlanToWorkout(workoutId: string, dto: AddPlanDto) {
    // verifica workout
    const workoutExists = await this.prisma.workout.findUnique({
      where: { id: workoutId },
      select: { id: true },
    });

    if (!workoutExists) {
      throw new NotFoundException(`Workout ${workoutId} not found`);
    }

    // inserisci relazioni (skipDuplicates evita doppioni)
    await this.prisma.workoutPlan.createMany({
      data: dto.plans.map((planId) => ({
        workoutId,
        planId,
      })),
      skipDuplicates: true,
    });

    // restituisci workout aggiornato
    return this.prisma.workout.findUnique({
      where: { id: workoutId },
      include: {
        workoutPlans: {
          include: {
            plan: {
              include: {
                planExercises: {
                  include: { exercise: true },
                  orderBy: { order: 'asc' },
                },
              },
            },
          },
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async removePlanFromWorkout(workoutId: string, planId: string) {
    const deleted = await this.prisma.workoutPlan.deleteMany({
      where: {
        workoutId,
        planId,
      },
    });

    if (deleted.count === 0) {
      throw new NotFoundException(
        `Plan ${planId} not associated with workout ${workoutId}`,
      );
    }

    return { success: true };
  }
}
