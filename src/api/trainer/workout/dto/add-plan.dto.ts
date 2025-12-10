import { IsArray, IsUUID } from 'class-validator';

export class AddPlanDto {
  @IsArray()
  @IsUUID('4', { each: true })
  plans: string[];
}
