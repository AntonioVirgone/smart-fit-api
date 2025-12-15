import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlanByExerciseCode } from './dto/create-plan-by-excercise-code.dto';
import { AddExerciseDto } from './dto/add-exercise.dto';
import { PrismaService } from '../../../prisma/prisma.service';
import { Exercise, Plan } from '@prisma/client';

@Injectable()
export class PlanService {
  constructor(private readonly prisma: PrismaService) {}

  async createPlanByExCode(dto: CreatePlanByExerciseCode) {
    // verifica esercizi
    const exercises = await this.prisma.exercise.findMany({
      where: { id: { in: dto.exercises } },
      select: { id: true },
    });

    const foundIds = exercises.map((e) => e.id);
    const missing = dto.exercises.filter((id) => !foundIds.includes(id));

    if (missing.length) {
      throw new NotFoundException(
        `Exercise with id ${missing.join(', ')} not found`,
      );
    }

    // crea plan
    const plan = await this.prisma.plan.create({
      data: { name: dto.name },
    });

    // collega esercizi (join table)
    await this.prisma.planExercise.createMany({
      data: dto.exercises.map((exerciseId, index) => ({
        planId: plan.id,
        exerciseId,
        order: index,
      })),
    });

    return this.findById(plan.id);
  }

  async addExerciseToPlan(planId: string, dto: AddExerciseDto) {
    const planExists = await this.prisma.plan.findUnique({
      where: { id: planId },
      select: { id: true },
    });

    if (!planExists) {
      throw new NotFoundException(`Plan ${planId} not found`);
    }

    await this.prisma.planExercise.createMany({
      data: dto.exercises.map((exerciseId, index) => ({
        planId,
        exerciseId,
        order: index,
      })),
      skipDuplicates: true,
    });

    return this.findById(planId);
  }

  async removeExerciseFromPlan(planId: string, exerciseId: string) {
    const deleted = await this.prisma.planExercise.deleteMany({
      where: {
        planId,
        exerciseId,
      },
    });

    if (deleted.count === 0) {
      throw new NotFoundException(
        `Exercise ${exerciseId} not associated with plan ${planId}`,
      );
    }

    return this.findById(planId);
  }

  async findAll() {
    return this.prisma.plan.findMany({
      include: {
        planExercises: {
          orderBy: { order: 'asc' },
          include: {
            exercise: true,
          },
        },
        workoutPlans: {
          include: {
            workout: true,
          },
        },
      },
    });
  }

  async findById(planId: string) {
    return this.prisma.plan.findUnique({
      where: { id: planId },
      include: {
        planExercises: {
          orderBy: { order: 'asc' },
          include: {
            exercise: true,
          },
        },
      },
    });
  }

  async removeAll() {
    return this.prisma.plan.deleteMany();
  }
}
