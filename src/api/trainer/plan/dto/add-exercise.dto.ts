import { IsArray, IsUUID } from 'class-validator';

export class AddExerciseDto {
  @IsArray()
  @IsUUID('4', { each: true })
  exercises: string[];
}
