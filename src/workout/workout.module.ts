import { Module } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { WorkoutController } from './workout.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workout } from './entities/workout.entity';
import { Exercise } from './entities/exercise.entity';
import { Day } from './entities/day.entity';
import { ExerciseService } from '../exercise/exercise.service';

@Module({
  imports: [TypeOrmModule.forFeature([Workout, Exercise, Day])],
  controllers: [WorkoutController],
  providers: [WorkoutService, ExerciseService],
  exports: [WorkoutService],
})
export class WorkoutModule {}
