import { IsString, IsEmail, MinLength, Validate } from 'class-validator';
import { Match } from './match.decorator'; // Import the custom decorator

export class RegisterDto {
  @IsEmail({}, { message: 'Invalid email address' })
  email: string; // Ensure the input is a valid email address

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string; // Ensure the password is at least 6 characters

  @IsString()
  @Validate(Match, ['password'], {
    message: 'Passwords do not match',
  }) // Custom validator to ensure passwords match
  confirmPassword: string; // Ensure the confirmation matches the password
}
