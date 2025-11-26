import { Injectable, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Exercise } from './entities/exercise.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateExerciseDto } from './dto/create-exercise.dto';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>,
  ) {}

  async createExercise(ex: CreateExerciseDto) {
    const exercise = this.exerciseRepository.create({
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
}
