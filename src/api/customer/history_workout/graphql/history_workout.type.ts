import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class HistoryType {
  @Field(() => ID)
  id: string;

  @Field()
  date: Date;

  @Field({ nullable: true })
  note?: string;
}

@ObjectType()
export class WorkoutHistoryType {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  customerId: string;

  @Field(() => ID)
  exerciseId: string;

  @Field()
  repetitions: number;

  @Field()
  weight: string;

  @Field({ nullable: true })
  notes?: string;

  @Field()
  type: string;

  @Field()
  intensity: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
