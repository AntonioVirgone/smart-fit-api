import { Module } from '@nestjs/common';
import { HistoryWorkoutService } from './history_workout.service';
import { HistoryWorkoutController } from './history_workout.controller';
import { HistoryResolver } from './graphql/history.resolver';

@Module({
  controllers: [HistoryWorkoutController],
  providers: [HistoryWorkoutService, HistoryResolver],
})
export class HistoryWorkoutModule {}
