import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import {
  CustomerModel,
  CustomerProfileModel,
  CustomerWorkoutModel,
  HistoryModel,
  HistoryWorkoutModel,
} from '../models/gql-types';
import {
  ActivateCustomerInput,
  AssignWorkoutInput,
  CreateCustomerProfileInput,
  HistoryWorkoutInput,
  SaveHistoryInput,
} from '../inputs/graphql-inputs';
import { CustomersService } from '../../api/customer/customers/customers.service';
import { CustomerWorkoutService } from '../../api/customer/customer_workout/customer_workout.service';
import { CustomerProfileService } from '../../api/customer/customer_profile/customer_profile.service';
import { HistoryService } from '../../api/customer/history/history.service';
import { HistoryWorkoutService } from '../../api/customer/history_workout/history_workout.service';
import { PrismaService } from '../../prisma/prisma.service';
import { GqlAuthGuard } from '../../auth/guard/gql-auth.guard';
import { CreateCustomerWorkoutDto } from '../../api/customer/customer_workout/dto/create-customer_workout.dto';
import { CreateCustomerProfileDto } from '../../api/customer/customer_profile/dto/create-customer_profile.dto';

@Resolver(() => CustomerModel)
export class CustomerResolver {
  constructor(
    private readonly customersService: CustomersService,
    private readonly customerWorkoutService: CustomerWorkoutService,
    private readonly customerProfileService: CustomerProfileService,
    private readonly historyService: HistoryService,
    private readonly historyWorkoutService: HistoryWorkoutService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [CustomerModel])
  customers() {
    return this.prisma.customer.findMany({
      include: {
        workouts: {
          include: {
            workout: {
              include: {
                workoutPlans: {
                  orderBy: { order: 'asc' },
                  include: {
                    plan: {
                      include: {
                        planExercises: {
                          orderBy: { order: 'asc' },
                          include: { exercise: true },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        profile: true,
        DeviceToken: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  @Query(() => CustomerModel, { nullable: true })
  customer(@Args('id') id: string) {
    return this.prisma.customer.findUnique({
      where: { id },
      include: {
        workouts: {
          include: {
            workout: {
              include: {
                workoutPlans: {
                  orderBy: { order: 'asc' },
                  include: {
                    plan: {
                      include: {
                        planExercises: {
                          orderBy: { order: 'asc' },
                          include: { exercise: true },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        profile: true,
        DeviceToken: true,
      },
    });
  }

  @Query(() => [CustomerWorkoutModel])
  customerWorkouts(@Args('customerId') customerId: string) {
    return this.customerWorkoutService.findByCustomer(customerId);
  }

  @Query(() => CustomerProfileModel, { nullable: true })
  customerProfile(@Args('customerId') customerId: string) {
    return this.prisma.customerProfile.findUnique({
      where: { customerId },
      include: { customer: true },
    });
  }

  @Query(() => [HistoryModel])
  customerHistory(@Args('customerId') customerId: string) {
    return this.historyService.findByCustomerId(customerId);
  }

  @Query(() => [HistoryWorkoutModel])
  customerHistoryWorkouts(@Args('customerId') customerId: string) {
    return this.historyWorkoutService.findAll(customerId);
  }

  @Mutation(() => CustomerModel)
  activateCustomer(@Args('input') input: ActivateCustomerInput) {
    return this.customersService.activate(input);
  }

  @Mutation(() => CustomerWorkoutModel)
  @UseGuards(GqlAuthGuard)
  assignWorkout(@Args('input') input: AssignWorkoutInput) {
    const payload: CreateCustomerWorkoutDto = {
      customerCode: input.customerId,
      workoutCode: input.workoutId,
    };
    return this.customerWorkoutService.assign(payload);
  }

  @Mutation(() => CustomerProfileModel)
  @UseGuards(GqlAuthGuard)
  createCustomerProfile(
    @Args('customerId') customerId: string,
    @Args('profile') profile: CreateCustomerProfileInput,
  ) {
    const dto: CreateCustomerProfileDto = {
      name: profile.name,
      lastname: profile.lastname,
      email: '',
      phone: '',
      age: profile.age,
      weight: profile.weight,
      height: profile.height,
    };
    return this.customerProfileService.create(customerId, dto);
  }

  @Mutation(() => CustomerProfileModel)
  @UseGuards(GqlAuthGuard)
  updateCustomerProfile(
    @Args('profileId') profileId: string,
    @Args('profile') profile: CreateCustomerProfileInput,
  ) {
    return this.customerProfileService.update(profileId, profile);
  }

  @Mutation(() => HistoryModel)
  @UseGuards(GqlAuthGuard)
  recordHistory(@Args('input') input: SaveHistoryInput) {
    return this.historyService.saveJson(input.customerId, {
      jsonData: input.jsonData,
      filename: input.filename,
      status: input.status,
    });
  }

  @Mutation(() => HistoryWorkoutModel)
  @UseGuards(GqlAuthGuard)
  recordHistoryWorkout(@Args('input') input: HistoryWorkoutInput) {
    return this.historyWorkoutService.create(input.customerId, {
      exerciseId: input.exerciseId,
      repetitions: input.repetitions,
      weight: input.weight,
      notes: input.notes,
      type: input.type,
      intensity: input.intensity,
    });
  }
}
