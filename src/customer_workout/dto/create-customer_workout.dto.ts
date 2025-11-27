// dto/create-customer-workout.dto.ts
import { IsUUID } from 'class-validator';

export class CreateCustomerWorkoutDto {
  @IsUUID()
  customerId: string;

  @IsUUID()
  workoutId: string;
}
