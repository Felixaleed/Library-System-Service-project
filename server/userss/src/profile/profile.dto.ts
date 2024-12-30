/* eslint-disable prettier/prettier */
import { IsString, IsOptional, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  gender: string;

  @IsString()
  role: string;

  @IsOptional()
  @IsString()
  avatar?: string;
}
