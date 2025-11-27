import { PartialType } from '@nestjs/swagger';
import { CreateCustomerWorkoutDto } from './create-customer_workout.dto';

export class UpdateCustomerWorkoutDto extends PartialType(CreateCustomerWorkoutDto) {}
