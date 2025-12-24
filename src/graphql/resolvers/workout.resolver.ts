import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  WorkoutModel,
  PlanModel,
  ExerciseModel,
} from '../models/gql-types';
import {
  AddExerciseToPlanInput,
  AddPlanToWorkoutInput,
  CreateExerciseInput,
  CreatePlanInput,
  CreateWorkoutInput,
} from '../inputs/graphql-inputs';
import { WorkoutService } from '../../api/trainer/workout/workout.service';
import { PlanService } from '../../api/trainer/plan/plan.service';
import { ExerciseService } from '../../api/trainer/exercise/exercise.service';

@Resolver(() => WorkoutModel)
export class WorkoutResolver {
  constructor(
    private readonly workoutService: WorkoutService,
    private readonly planService: PlanService,
    private readonly exerciseService: ExerciseService,
  ) {}

  @Query(() => [WorkoutModel])
  workouts() {
    return this.workoutService.findAll();
  }

  @Query(() => [PlanModel])
  plans() {
    return this.planService.findAll();
  }

  @Query(() => [ExerciseModel])
  exercises() {
    return this.exerciseService.findAll();
  }

  @Mutation(() => WorkoutModel)
  createWorkout(@Args('input') input: CreateWorkoutInput) {
    return this.workoutService.createWorkoutByPlanCode({
      name: input.name,
      plans: input.plans,
    });
  }

  @Mutation(() => WorkoutModel)
  addPlansToWorkout(@Args('input') input: AddPlanToWorkoutInput) {
    return this.workoutService.addPlanToWorkout(input.workoutId, {
      plans: input.plans,
    });
  }

  @Mutation(() => Boolean)
  removePlanFromWorkout(
    @Args('workoutId') workoutId: string,
    @Args('planId') planId: string,
  ) {
    return this.workoutService
      .removePlanFromWorkout(workoutId, planId)
      .then(() => true);
  }

  @Mutation(() => PlanModel)
  createPlan(@Args('input') input: CreatePlanInput) {
    return this.planService.createPlanByExCode({
      name: input.name,
      exercises: input.exercises,
    });
  }

  @Mutation(() => PlanModel)
  addExercisesToPlan(@Args('input') input: AddExerciseToPlanInput) {
    return this.planService.addExerciseToPlan(input.planId, {
      exercises: input.exercises,
    });
  }

  @Mutation(() => PlanModel)
  removeExerciseFromPlan(
    @Args('planId') planId: string,
    @Args('exerciseId') exerciseId: string,
  ) {
    return this.planService.removeExerciseFromPlan(planId, exerciseId);
  }

  @Mutation(() => ExerciseModel)
  createExercise(@Args('input') input: CreateExerciseInput) {
    return this.exerciseService.createExercise(input);
  }
}
