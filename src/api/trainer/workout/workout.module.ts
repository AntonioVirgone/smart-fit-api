import { Module } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { WorkoutController } from './workout.controller';
import { ExerciseService } from '../exercise/exercise.service';

@Module({
  controllers: [WorkoutController],
  providers: [WorkoutService, ExerciseService],
  exports: [WorkoutService],
})
export class WorkoutModule {}
