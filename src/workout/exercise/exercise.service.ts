import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Exercise } from './entities/exercise.entity';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>,
  ) {}

  async createExercise(trainerCode: string, ex: CreateExerciseDto) {
    const exercise = this.exerciseRepository.create({
      trainerCode: trainerCode,
      name: ex.name,
      description: ex.description,
      imageName: ex.imageName,
      muscleGroup: ex.muscleGroup,
      sets: ex.sets,
      repetitions: ex.repetitions,
      recovery: ex.recovery,
      instructions: ex.instructions,
    });

    return await this.exerciseRepository.save(exercise);
  }

  async findAll(): Promise<Exercise[]> {
    return await this.exerciseRepository.find();
  }

  public async findAllExercisesInList(codes: string[]): Promise<Exercise[]> {
    return await this.exerciseRepository.findBy({ id: In(codes) });
  }

  async findExerciseByExerciseCode(id: string): Promise<Exercise> {
    const exercise = await this.exerciseRepository.findOne({ where: { id } });
    if (!exercise) {
      throw new NotFoundException(`Exercise with code ${id}`);
    }
    return exercise;
  }

  async findOne(id: string): Promise<Exercise | null> {
    return await this.exerciseRepository.findOne({ where: { id } });
  }

  async update(id: string, updateExerciseDto: UpdateExerciseDto) {
    return await this.exerciseRepository.update(id, updateExerciseDto);
  }

  remove(id: number) {
    return `This action removes a #${id} exercise`;
  }

  async removeAll() {
    return await this.exerciseRepository.deleteAll();
  }
}
