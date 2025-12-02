import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Exercise } from '@prisma/client';

@Injectable()
export class ExerciseService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async createExercise(ex: CreateExerciseDto) {
    return await this.prisma.exercise.create({
      data: {
        name: ex.name,
        description: ex.description,
        imageName: ex.imageName,
        muscleGroup: ex.muscleGroup,
        sets: ex.sets,
        repetitions: ex.repetitions,
        recovery: ex.recovery,
        instructions: ex.instructions,
      },
    });
  }

  async findAll(): Promise<Exercise[]> {
    return await this.prisma.exercise.findMany();
  }

  public async findAllExercisesInList(codes: string[]): Promise<Exercise[]> {
    return await this.prisma.exercise.findMany({
      where: { id: { in: codes } },
    });
  }

  async findExerciseByExerciseCode(id: string): Promise<Exercise> {
    const exercise = await this.prisma.exercise.findUnique({ where: { id } });
    if (!exercise) {
      throw new NotFoundException(`Exercise with code ${id}`);
    }
    return exercise;
  }

  async findOne(id: string): Promise<Exercise | null> {
    return await this.prisma.exercise.findUnique({ where: { id } });
  }

  async update(id: string, updateExerciseDto: UpdateExerciseDto) {
    return await this.prisma.exercise.update({
      where: { id },
      data: updateExerciseDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} exercise`;
  }

  async removeAll() {
    return await this.prisma.exercise.deleteMany();
  }
}
