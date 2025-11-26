import { IsString, IsNotEmpty } from 'class-validator';

export class ActivateUserDto {
  @IsString()
  @IsNotEmpty()
  activationCode: string;
}
