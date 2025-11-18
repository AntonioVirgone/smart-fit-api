import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateExerciseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  imageName: string;

  @IsString()
  muscleGroup: string;

  @IsArray()
  @IsString({ each: true })
  instructions: string[];
}
