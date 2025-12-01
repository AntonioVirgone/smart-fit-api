import { Module } from '@nestjs/common';
import { CustomerWorkoutService } from './customer_workout.service';
import { CustomerWorkoutController } from './customer_workout.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerWorkout } from './entities/customer_workout.entity';
import { Customer } from '../customers/entities/customer.entity';
import { Workout } from '../workout/entities/workout.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerWorkout, Customer, Workout])],
  providers: [CustomerWorkoutService],
  controllers: [CustomerWorkoutController],
  exports: [CustomerWorkoutService],
})
export class CustomerWorkoutModule {}
