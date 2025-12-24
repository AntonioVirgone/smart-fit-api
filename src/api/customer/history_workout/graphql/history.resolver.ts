import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { HistoryType, WorkoutHistoryType } from './history_workout.type';
import { HistoryWorkoutService } from '../history_workout.service';

@Resolver(() => HistoryType)
export class HistoryResolver {
  constructor(private readonly historyService: HistoryWorkoutService) {}

  @Query(() => [HistoryType])
  historyWorkout() {
    return this.historyService.find(); // riusa la logica che già hai
  }

  @Query(() => [WorkoutHistoryType])
  workoutHistory() {
    return this.historyService.find();
  }

  @Query(() => [WorkoutHistoryType])
  workoutHistoryByCustomer(
    @Args('customerId', { type: () => ID }) customerId: string,
  ) {
    return this.historyService.findAll(customerId);
  }
}
