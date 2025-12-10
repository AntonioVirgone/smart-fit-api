import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlanByExerciseCode } from './dto/create-plan-by-excercise-code.dto';
import { AddExerciseDto } from './dto/add-exercise.dto';
import { PrismaService } from '../../../prisma/prisma.service';
import { Exercise, Plan } from '@prisma/client';

@Injectable()
export class PlanService {
  constructor(private readonly prisma: PrismaService) {}

  async createPlanByExCode(createPlanByExerciseCode: CreatePlanByExerciseCode) {
    const exercises = await this.prisma.exercise.findMany({
      where: { id: { in: createPlanByExerciseCode.exercises } },
    });

    const missingExercises = createPlanByExerciseCode.exercises.filter(
      (id) => !exercises.some((exercise) => exercise.id === id),
    );

    if (missingExercises.length) {
      throw new NotFoundException(
        `Exercise with id ${missingExercises.join(', ')} not found`,
      );
    }

    return await this.prisma.plan.create({
      data: {
        name: createPlanByExerciseCode.name,
        exercises: {
          connect: exercises.map((exercise) => ({ id: exercise.id })),
        },
      },
      include: { exercises: true },
    });
  }

  async addExerciseToPlan(planCode: string, addExerciseDto: AddExerciseDto) {
    const plan = await this.prisma.plan.findUnique({
      where: { id: planCode },
      include: { exercises: true },
    });
    if (!plan) {
      throw new NotFoundException(`Plan with code ${planCode} not found`);
    }

    const exercises = await this.prisma.exercise.findMany({
      where: { id: { in: addExerciseDto.exercises } },
    });

    if (!exercises.length) {
      throw new NotFoundException(`No exercises found with the provided IDs`);
    }

    const newExercises = exercises.filter(
      (ex) => !plan.exercises.some((e) => e.id === ex.id),
    );

    if (!newExercises.length) {
      return plan;
    }

    return this.prisma.plan.update({
      where: { id: planCode },
      data: {
        exercises: {
          connect: newExercises.map((exercise) => ({ id: exercise.id })),
        },
      },
      include: { exercises: true },
    });
  }

  async removeExerciseFromPlan(planCode: string, exerciseId: string) {
    const plan = await this.prisma.plan.findUnique({
      where: { id: planCode },
      include: { exercises: true },
    });
    if (!plan) {
      throw new NotFoundException(`Plan with code ${planCode} not found`);
    }

    const exerciseIndex = plan.exercises.findIndex((e) => e.id === exerciseId);
    if (exerciseIndex === -1) {
      throw new NotFoundException(
        `Exercise with id ${exerciseId} not found in this plan`,
      );
    }

    const remainingExercises = plan.exercises.filter(
      (exercise) => exercise.id !== exerciseId,
    );

    return this.prisma.plan.update({
      where: { id: planCode },
      data: {
        exercises: {
          set: remainingExercises.map((exercise) => ({ id: exercise.id })),
        },
      },
      include: { exercises: true },
    });
  }

  async findAll() {
    return await this.prisma.plan.findMany({
      include: { exercises: true, workout: true },
    });
  }

  async findOne(id: string) {
    return await this.prisma.plan.findUnique({
      where: { id },
      include: { exercises: true, workout: true },
    });
  }

  async removeAll() {
    return await this.prisma.plan.deleteMany();
  }
}
