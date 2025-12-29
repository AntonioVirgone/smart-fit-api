import { IsObject, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateHistoryDto {
  @IsString()
  customerId: string;

  @IsObject()
  jsonData: any;

  @IsString()
  @IsOptional()
  filename?: string;

  @IsNumber()
  @IsOptional()
  dataSize?: number;

  @IsString()
  @IsOptional()
  status?: string;
}
