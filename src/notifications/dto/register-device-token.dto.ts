import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDeviceTokenDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsEnum(['ios', 'android'])
  platform: 'ios' | 'android';
}
