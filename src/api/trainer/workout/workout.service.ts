import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkoutByPlanCodeDto } from './dto/create-workout-by-plan-code.dto';
import { AddPlanDto } from './dto/add-plan.dto';
import { PrismaService } from '../../../prisma/prisma.service';
import { Plan, Workout } from '@prisma/client';

@Injectable()
export class WorkoutService {
  constructor(private readonly prisma: PrismaService) {}

  /*
  async create(customerId: string, dto: CreateWorkoutDto): Promise<Workout> {
    const workout = this.workoutRepository.create({
      id: uuidv4(),
      customerId: customerId,
      name: dto.name,
      plans: dto.days.map((day) => ({
        name: day.name,
        exercises: day.exercises.map((ex) => ({
          name: ex.name,
          description: ex.description,
          imageName: ex.imageName,
          muscleGroup: ex.muscleGroup,
          sets: ex.sets,
          repetitions: ex.repetitions,
          recovery: ex.recovery,
          instructions: ex.instructions,
        })),
      })),
    });

    return await this.workoutRepository.save(workout);
  }

  async findByCustomerId(customerId: string): Promise<Workout> {
    const workout = await this.workoutRepository.findOne({
      where: { customerId },
    });

    if (!workout) {
      console.log('Workout does not exist');
      throw new NotFoundException();
    }
    return workout;
  }
*/

  async createWorkoutByPlanCode(
    createWorkoutByPlanCode: CreateWorkoutByPlanCodeDto,
  ) {
    const plans = await this.prisma.plan.findMany({
      where: { id: { in: createWorkoutByPlanCode.plans } },
    });

    const missingPlans = createWorkoutByPlanCode.plans.filter(
      (id) => !plans.some((plan) => plan.id === id),
    );

    if (missingPlans.length) {
      throw new NotFoundException(
        `Plan with id ${missingPlans.join(', ')} not found`,
      );
    }

    return await this.prisma.workout.create({
      data: {
        name: createWorkoutByPlanCode.name,
        plans: {
          connect: plans.map((plan) => ({ id: plan.id })),
        },
      },
      include: { plans: { include: { exercises: true } } },
    });
  }

  async findOne(id: string) {
    return await this.prisma.workout.findUnique({
      where: { id },
      include: { plans: { include: { exercises: true } } },
    });
  }

  async findAll() {
    return await this.prisma.workout.findMany({
      include: { plans: { include: { exercises: true } } },
    });
  }

  async removeAll() {
    return await this.prisma.workout.deleteMany();
  }

  async addPlanToWorkout(workoutCode: string, addPlanDto: AddPlanDto) {
    const workout = await this.prisma.workout.findUnique({
      where: { id: workoutCode },
      include: { plans: true },
    });
    if (!workout) {
      throw new NotFoundException(`Workout with code ${workoutCode} not found`);
    }

    const plans = await this.prisma.plan.findMany({
      where: { id: { in: addPlanDto.plans } },
    });

    if (!plans.length) {
      throw new NotFoundException(`No exercises found with the provided IDs`);
    }

    const newPlans = plans.filter(
      (ex) => !workout.plans.some((e) => e.id === ex.id),
    );

    if (!newPlans.length) {
      return workout;
    }

    return this.prisma.workout.update({
      where: { id: workoutCode },
      data: {
        plans: {
          connect: newPlans.map((plan) => ({ id: plan.id })),
        },
      },
      include: { plans: { include: { exercises: true } } },
    });
  }

  async removePlanFromWorkout(workoutCode: string, planCode: string) {
    const workout = await this.prisma.workout.findUnique({
      where: { id: workoutCode },
      include: { plans: true },
    });
    if (!workout) {
      throw new NotFoundException(`Plan with code ${workoutCode} not found`);
    }

    const planIndex = workout.plans.findIndex((e) => e.id === planCode);
    if (planIndex === -1) {
      throw new NotFoundException(
        `Exercise with id ${planCode} not found in this plan`,
      );
    }

    const remainingPlans = workout.plans.filter((plan) => plan.id !== planCode);

    return this.prisma.workout.update({
      where: { id: workoutCode },
      data: {
        plans: {
          set: remainingPlans.map((plan) => ({ id: plan.id })),
        },
      },
      include: { plans: { include: { exercises: true } } },
    });
  }
}
