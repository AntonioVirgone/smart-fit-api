import { Module } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { WorkoutController } from './workout.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workout } from './entities/workout.entity';
import { ExerciseService } from '../exercise/exercise.service';
import { Exercise } from '../exercise/entities/exercise.entity';
import { Plan } from '../plan/entities/plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workout, Exercise, Plan])],
  controllers: [WorkoutController],
  providers: [WorkoutService, ExerciseService],
  exports: [WorkoutService],
})
export class WorkoutModule {}
