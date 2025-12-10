import { Module } from '@nestjs/common';
import { CustomerWorkoutService } from './customer_workout.service';
import { CustomerWorkoutController } from './customer_workout.controller';

@Module({
  providers: [CustomerWorkoutService],
  controllers: [CustomerWorkoutController],
  exports: [CustomerWorkoutService],
})
export class CustomerWorkoutModule {}
