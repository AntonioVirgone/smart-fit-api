import { Injectable } from '@nestjs/common';
import { CreateHistoryWorkoutDto } from './dto/create-history_workout.dto';
import { UpdateHistoryWorkoutDto } from './dto/update-history_workout.dto';
import { PrismaService } from '../../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class HistoryWorkoutService {
  constructor(private prisma: PrismaService) {}

  async create(
    customerId: string,
    createHistoryWorkoutDto: Required<CreateHistoryWorkoutDto>,
  ) {
    const data: Prisma.HistoryWorkoutCreateInput = {
      customer: { connect: { id: customerId } },
      exercise: { connect: { id: createHistoryWorkoutDto.exerciseId } },
      repetitions: createHistoryWorkoutDto.repetitions,
      weight: createHistoryWorkoutDto.weight,
      notes: createHistoryWorkoutDto.notes,
      type: createHistoryWorkoutDto.type,
      intensity: createHistoryWorkoutDto.intensity,
    };

    return this.prisma.historyWorkout.create({ data });
  }

  async findAll(customerId: string) {
    return this.prisma.historyWorkout.findMany({
      where: { customerId },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} historyWorkout`;
  }

  update(id: number, updateHistoryWorkoutDto: UpdateHistoryWorkoutDto) {
    return `This action updates a #${id} historyWorkout`;
  }

  remove(id: number) {
    return `This action removes a #${id} historyWorkout`;
  }

  find() {
    return this.prisma.historyWorkout.findMany({});
  }
}
