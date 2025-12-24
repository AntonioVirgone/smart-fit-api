import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { CustomersModule } from '../api/customer/customers/customers.module';
import { CustomerWorkoutModule } from '../api/customer/customer_workout/customer_workout.module';
import { CustomerProfileModule } from '../api/customer/customer_profile/customer_profile.module';
import { HistoryModule } from '../api/customer/history/history.module';
import { HistoryWorkoutModule } from '../api/customer/history_workout/history_workout.module';
import { TrainerModule } from '../api/trainer/trainer/trainer.module';
import { WorkoutModule } from '../api/trainer/workout/workout.module';
import { PlanModule } from '../api/trainer/plan/plan.module';
import { ExerciseModule } from '../api/trainer/exercise/exercise.module';
import { AuthResolver } from './resolvers/auth.resolver';
import { CustomerResolver } from './resolvers/customer.resolver';
import { TrainerResolver } from './resolvers/trainer.resolver';
import { WorkoutResolver } from './resolvers/workout.resolver';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CustomersModule,
    CustomerWorkoutModule,
    CustomerProfileModule,
    HistoryModule,
    HistoryWorkoutModule,
    TrainerModule,
    WorkoutModule,
    PlanModule,
    ExerciseModule,
  ],
  providers: [AuthResolver, CustomerResolver, TrainerResolver, WorkoutResolver],
})
export class GraphqlModule {}
