import { IsObject, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateHistoryDto {
  @IsString()
  customerId: string;

  @IsObject()
  json_data: any;

  @IsString()
  @IsOptional()
  filename?: string;

  @IsNumber()
  @IsOptional()
  data_size?: number;

  @IsString()
  @IsOptional()
  status?: string;
}
