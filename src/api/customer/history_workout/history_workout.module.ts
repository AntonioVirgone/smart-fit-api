import { Module } from '@nestjs/common';
import { HistoryWorkoutService } from './history_workout.service';
import { HistoryWorkoutController } from './history_workout.controller';

@Module({
  controllers: [HistoryWorkoutController],
  providers: [HistoryWorkoutService],
})
export class HistoryWorkoutModule {}
