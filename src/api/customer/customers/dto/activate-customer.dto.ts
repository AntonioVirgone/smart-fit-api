import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ActivateCustomerDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  activationCode: string;
}
