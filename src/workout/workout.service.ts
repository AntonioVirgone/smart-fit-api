import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workout } from './entities/workout.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { Exercise } from './entities/exercise.entity';
import { Day } from './entities/day.entity';
import { CreateDayByExerciseCode } from './dto/create-day-by-excercise-code.dto';
import { ExerciseService } from './exercise.service';

@Injectable()
export class WorkoutService {
  constructor(
    @InjectRepository(Workout)
    private workoutRepository: Repository<Workout>,
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>,
    @InjectRepository(Day)
    private dayRepository: Repository<Day>,
    private readonly exerciseService: ExerciseService,
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

  async createDayByExCode(day: CreateDayByExerciseCode) {
    const exercises: Exercise[] = [];

    for (const id of day.exercises) {
      const exercise = await this.exerciseRepository.findOne({ where: { id } });
      if (!exercise) {
        throw new NotFoundException(`Exercise with id ${id} not found`);
      }
      exercises.push(exercise);
    }

    // Creiamo il giorno
    const newDay = this.dayRepository.create({
      name: day.name,
      exercises: exercises,
    });

    return await this.dayRepository.save(newDay);
  }

  async create(customerId: string, dto: CreateWorkoutDto): Promise<Workout> {
    const workout = this.workoutRepository.create({
      id: uuidv4(),
      customerId: customerId,
      name: dto.name,
      days: dto.days.map((day) => ({
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
      throw new NotFoundException();
    }
    return workout;
  }

  async findAll() {
    return await this.workoutRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} workout`;
  }

  update(id: number, updateWorkoutDto: UpdateWorkoutDto) {
    return `This action updates a #${id} workout`;
  }

  remove(id: number) {
    return `This action removes a #${id} workout`;
  }
}
