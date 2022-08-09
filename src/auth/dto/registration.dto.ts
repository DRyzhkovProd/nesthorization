import { IsEmail, IsString } from 'class-validator';

export class RegistrationDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  displayName?: string;
}
