import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TrainerService } from '../../api/trainer/trainer/trainer.service';
import { TrainerModel, CustomerModel } from '../models/gql-types';
import { CreateTrainerInput, CreateCustomerInput } from '../inputs/graphql-inputs';

@Resolver(() => TrainerModel)
export class TrainerResolver {
  constructor(private readonly trainerService: TrainerService) {}

  @Query(() => [TrainerModel])
  trainers() {
    return this.trainerService.findAll();
  }

  @Query(() => TrainerModel, { nullable: true })
  trainer(@Args('id') id: string) {
    return this.trainerService.findOne(id);
  }

  @Mutation(() => TrainerModel)
  createTrainer(@Args('input') input: CreateTrainerInput) {
    return this.trainerService.create(input);
  }

  @Mutation(() => CustomerModel)
  createCustomerForTrainer(
    @Args('trainerId') trainerId: string,
    @Args('input') input: CreateCustomerInput,
  ) {
    return this.trainerService.createCustomer(trainerId, input);
  }
}
