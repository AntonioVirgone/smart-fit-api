// dto/create-customer-workout.dto.ts
import { IsUUID } from 'class-validator';

export class CreateCustomerWorkoutDto {
  @IsUUID()
  customerCode: string;

  @IsUUID()
  workoutCode: string;
}
