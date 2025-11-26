import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workout } from './entities/workout.entity';
import { CreateWorkoutByPlanCodeDto } from './dto/create-workout-by-plan-code.dto';
import { Plan } from '../plan/entities/plan.entity';

@Injectable()
export class WorkoutService {
  constructor(
    @InjectRepository(Workout)
    private workoutRepository: Repository<Workout>,
    @InjectRepository(Plan)
    private planRepository: Repository<Plan>,
  ) {}

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
      throw new NotFoundException();
    }
    return workout;
  }
*/

  async createWorkoutByPlanCode(
    createWorkoutByPlanCode: CreateWorkoutByPlanCodeDto,
  ) {
    const plans: Plan[] = [];

    for (const id of createWorkoutByPlanCode.plans) {
      const plan = await this.planRepository.findOne({ where: { id } });
      if (!plan) {
        throw new NotFoundException(`Exercise with id ${id} not found`);
      }
      plans.push(plan);
    }

    // Creiamo il giorno
    const workout = this.workoutRepository.create({
      name: createWorkoutByPlanCode.name,
      plans: plans,
    });

    return await this.workoutRepository.save(workout);
  }

  async findAll() {
    return await this.workoutRepository.find();
  }

  async removeAll() {
    return await this.workoutRepository.deleteAll();
  }
}
