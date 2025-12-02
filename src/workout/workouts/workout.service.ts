import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Workout } from './entities/workout.entity';
import { CreateWorkoutByPlanCodeDto } from './dto/create-workout-by-plan-code.dto';
import { Plan } from '../plan/entities/plan.entity';
import { AddPlanDto } from './dto/add-plan.dto';

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

  async findOne(id: string) {
    return await this.workoutRepository.findOne({ where: { id } });
  }

  async findAll() {
    return await this.workoutRepository.find();
  }

  async removeAll() {
    return await this.workoutRepository.deleteAll();
  }

  // ---- ADD PLAN TO WORKOUT ----
  async addPlanToWorkout(workoutCode: string, addPlanDto: AddPlanDto) {
    const workout = await this.findOne(workoutCode);
    if (!workout) {
      throw new NotFoundException(`Workout with code ${workoutCode} not found`);
    }

    // Trova tutti gli esercizi in un'unica query
    const plans = await this.planRepository.findBy({
      id: In(addPlanDto.plans),
    });

    if (!plans.length) {
      throw new NotFoundException(`No exercises found with the provided IDs`);
    }

    // Aggiungi solo gli esercizi che non sono già presenti
    const newPlans = plans.filter(
      (ex) => !workout.plans.some((e) => e.id === ex.id),
    );
    workout.plans.push(...newPlans);

    await this.planRepository.save(workout); // salva le modifiche

    return workout; // opzionale, per restituire il piano aggiornato
  }

  // ---- REMOVE ----
  async removePlanFromWorkout(workoutCode: string, planCode: string) {
    const workout = await this.findOne(workoutCode);
    if (!workout) {
      throw new NotFoundException(`Plan with code ${workoutCode} not found`);
    }

    const planIndex = workout.plans.findIndex((e) => e.id === planCode);
    if (planIndex === -1) {
      throw new NotFoundException(
        `Exercise with id ${planCode} not found in this plan`,
      );
    }

    // Rimuovi l'esercizio dall'array
    workout.plans.splice(planIndex, 1);

    // Salva le modifiche
    await this.planRepository.save(workout);

    return workout; // opzionale: restituisce il piano aggiornato
  }
}
