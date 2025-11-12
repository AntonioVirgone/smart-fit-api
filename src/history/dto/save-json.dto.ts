import { IsObject, IsOptional, IsString } from 'class-validator';

export class SaveJsonDto {
  @IsObject()
  jsonData: any;

  @IsString()
  @IsOptional()
  filename?: string;

  @IsString()
  @IsOptional()
  status?: string;
}
