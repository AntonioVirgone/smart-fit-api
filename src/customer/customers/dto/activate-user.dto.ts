import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class ActivateUserDto {
  @IsUUID()
  @IsNotEmpty()
  customerCode: string;

  @IsString()
  @IsNotEmpty()
  activationCode: string;
}
