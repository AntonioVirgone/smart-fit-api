import { PartialType } from '@nestjs/swagger';
import { CreateHistoryWorkoutDto } from './create-history_workout.dto';

export class UpdateHistoryWorkoutDto extends PartialType(CreateHistoryWorkoutDto) {}
