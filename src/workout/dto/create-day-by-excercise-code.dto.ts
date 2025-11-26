import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateDayByExerciseCode {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsArray()
  @IsUUID('4', { each: true })
  exercises: string[];
}
