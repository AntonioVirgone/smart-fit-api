import { Field, Float, ID, InputType, Int } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

@InputType()
export class LoginInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@InputType()
export class RefreshTokenInput {
  @Field()
  refreshToken: string;
}

@InputType()
export class ActivateCustomerInput {
  @Field()
  email: string;

  @Field()
  activationCode: string;
}

@InputType()
export class AssignWorkoutInput {
  @Field()
  customerId: string;

  @Field()
  workoutId: string;
}

@InputType()
export class CreateCustomerProfileInput {
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
}

@InputType()
export class SaveHistoryInput {
  @Field()
  customerId: string;

  @Field(() => GraphQLJSON)
  jsonData: any;

  @Field({ nullable: true })
  filename?: string;

  @Field({ nullable: true })
  status?: string;
}

@InputType()
export class HistoryWorkoutInput {
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

  @Field({ defaultValue: 'series' })
  type?: string;

  @Field({ nullable: true })
  intensity?: string;
}

@InputType()
export class CreateWorkoutInput {
  @Field()
  name: string;

  @Field(() => [ID])
  plans: string[];
}

@InputType()
export class AddPlanToWorkoutInput {
  @Field()
  workoutId: string;

  @Field(() => [ID])
  plans: string[];
}

@InputType()
export class CreatePlanInput {
  @Field()
  name: string;

  @Field(() => [ID])
  exercises: string[];
}

@InputType()
export class AddExerciseToPlanInput {
  @Field()
  planId: string;

  @Field(() => [ID])
  exercises: string[];
}

@InputType()
export class CreateExerciseInput {
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

@InputType()
export class CreateTrainerInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class TrainerLoginInput {
  @Field()
  name: string;

  @Field()
  password: string;
}

@InputType()
export class CreateCustomerInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  phoneNumber?: string;
}
