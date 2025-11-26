import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { CreatePlanByExerciseCode } from './dto/create-plan-by-excercise-code.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Plan } from './entities/plan.entity';
import { Exercise } from '../exercise/entities/exercise.entity';
import { AddExerciseDto } from './dto/add-exercise.dto';

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>,
    @InjectRepository(Plan)
    private planRepository: Repository<Plan>,
  ) {}

  async createDayByExCode(day: CreatePlanByExerciseCode) {
    const exercises: Exercise[] = [];

    for (const id of day.exercises) {
      const exercise = await this.exerciseRepository.findOne({ where: { id } });
      if (!exercise) {
        throw new NotFoundException(`Exercise with id ${id} not found`);
      }
      exercises.push(exercise);
    }

    // Creiamo il giorno
    const newDay = this.planRepository.create({
      name: day.name,
      exercises: exercises,
    });

    return await this.planRepository.save(newDay);
  }

  async addExerciseToPlan(planCode: string, addExerciseDto: AddExerciseDto) {
    const plan = await this.findOne(planCode);
    if (!plan) {
      throw new NotFoundException(`Plan with code ${planCode} not found`);
    }

    // Trova tutti gli esercizi in un'unica query
    const exercises = await this.exerciseRepository.findBy({
      id: In(addExerciseDto.exercises),
    });

    if (!exercises.length) {
      throw new NotFoundException(`No exercises found with the provided IDs`);
    }

    // Aggiungi solo gli esercizi che non sono già presenti
    const newExercises = exercises.filter(
      (ex) => !plan.exercises.some((e) => e.id === ex.id),
    );
    plan.exercises.push(...newExercises);

    await this.planRepository.save(plan); // salva le modifiche

    return plan; // opzionale, per restituire il piano aggiornato
  }

  async removeExerciseFromPlan(planCode: string, exerciseId: string) {
    const plan = await this.findOne(planCode);
    if (!plan) {
      throw new NotFoundException(`Plan with code ${planCode} not found`);
    }

    const exerciseIndex = plan.exercises.findIndex((e) => e.id === exerciseId);
    if (exerciseIndex === -1) {
      throw new NotFoundException(
        `Exercise with id ${exerciseId} not found in this plan`,
      );
    }

    // Rimuovi l'esercizio dall'array
    plan.exercises.splice(exerciseIndex, 1);

    // Salva le modifiche
    await this.planRepository.save(plan);

    return plan; // opzionale: restituisce il piano aggiornato
  }

  async findAll() {
    return await this.planRepository.find();
  }

  async findOne(id: string) {
    return await this.planRepository.findOne({ where: { id } });
  }

  update(id: number, updatePlanDto: UpdatePlanDto) {
    return `This action updates a #${id} plan`;
  }

  remove(id: number) {
    return `This action removes a #${id} plan`;
  }
}
