import { IsString, IsEmail } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string; // Ensure the input is a valid email address

  @IsString()
  password: string; // Password for login
}
