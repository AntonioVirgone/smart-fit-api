import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { WorkoutType } from '../enum/workout-type.enum';
import { WorkoutIntensity } from '../enum/workout-intensity.enum';

export class CreateHistoryWorkoutDto {
  @IsString()
  @IsNotEmpty()
  exerciseId: string;

  @IsNumber()
  @IsNotEmpty()
  repetitions: number;

  @IsNumber()
  @IsNotEmpty()
  weight: number;

  @IsString()
  notes: string;

  @IsEnum(WorkoutType)
  @IsNotEmpty()
  type: WorkoutType;

  @IsEnum(WorkoutIntensity)
  @IsNotEmpty()
  intensity: WorkoutIntensity;
}
