import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateWorkoutByPlanCodeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsArray()
  @IsUUID('4', { each: true })
  plans: string[];
}
