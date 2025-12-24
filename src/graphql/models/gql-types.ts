import {
  Field,
  Float,
  GraphQLISODateTime,
  ID,
  Int,
  ObjectType,
} from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

@ObjectType()
export class UserModel {
  @Field(() => Int)
  id: number;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  type: string;

  @Field({ nullable: true })
  customerId?: string;

  @Field()
  status: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;
}

@ObjectType()
export class DeviceTokenModel {
  @Field(() => ID)
  id: string;

  @Field()
  token: string;

  @Field()
  platform: string;
}

@ObjectType()
export class ExerciseModel {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  imageName: string;

  @Field()
  muscleGroup: string;

  @Field(() => Int)
  sets: number;

  @Field(() => Int)
  repetitions: number;

  @Field(() => Int)
  recovery: number;

  @Field(() => [String])
  instructions: string[];
}

@ObjectType()
export class PlanExerciseModel {
  @Field(() => ID)
  id: string;

  @Field(() => ExerciseModel)
  exercise: ExerciseModel;

  @Field(() => Int, { nullable: true })
  order?: number;
}

@ObjectType()
export class PlanModel {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => [PlanExerciseModel], { nullable: true })
  planExercises?: PlanExerciseModel[];
}

@ObjectType()
export class WorkoutPlanModel {
  @Field(() => ID)
  id: string;

  @Field(() => Int, { nullable: true })
  order?: number;

  @Field(() => PlanModel)
  plan: PlanModel;
}

@ObjectType()
export class WorkoutModel {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field(() => [WorkoutPlanModel], { nullable: true })
  workoutPlans?: WorkoutPlanModel[];
}

@ObjectType()
export class CustomerProfileModel {
  @Field(() => ID)
  id: string;

  @Field()
  customerId: string;

  @Field()
  name: string;

  @Field()
  lastname: string;

  @Field(() => Int)
  age: number;

  @Field(() => Int)
  weight: number;

  @Field(() => Float)
  height: number;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;
  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}

@ObjectType()
export class CustomerWorkoutModel {
  @Field(() => ID)
  id: string;

  @Field()
  customerId: string;

  @Field()
  workoutId: string;

  @Field(() => WorkoutModel)
  workout: WorkoutModel;
}

@ObjectType()
export class CustomerModel {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  activationCode?: string;

  @Field()
  status: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @Field(() => [CustomerWorkoutModel], { nullable: true })
  workouts?: CustomerWorkoutModel[];

  @Field(() => CustomerProfileModel, { nullable: true })
  profile?: CustomerProfileModel | null;

  @Field(() => [DeviceTokenModel], { nullable: true })
  DeviceToken?: DeviceTokenModel[];
}

@ObjectType()
export class TrainerModel {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @Field(() => [CustomerModel], { nullable: true })
  customers?: CustomerModel[];
}

@ObjectType()
export class HistoryModel {
  @Field(() => Int)
  id: number;

  @Field()
  customerId: string;

  @Field(() => GraphQLJSON, { nullable: true })
  jsonData?: any;

  @Field({ nullable: true })
  filename?: string;

  @Field(() => Int)
  dataSize: number;

  @Field()
  status: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;
}

@ObjectType()
export class HistoryWorkoutModel {
  @Field(() => ID)
  id: string;

  @Field()
  customerId: string;

  @Field()
  exerciseId: string;

  @Field(() => Int)
  repetitions: number;

  @Field(() => Float)
  weight: number;

  @Field()
  notes: string;

  @Field()
  type: string;

  @Field()
  intensity: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}

@ObjectType()
export class AuthTokensModel {
  @Field({ nullable: true })
  customerId?: string;

  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
