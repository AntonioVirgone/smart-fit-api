import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreatePlanByExerciseCode {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsArray()
  @IsUUID('4', { each: true })
  exercises: string[];
}
