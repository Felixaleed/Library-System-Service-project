import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateBookDto {
  @IsString()
  id: string; // Ensure this matches the schema and usage

  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsNumber() 
  publishYear: number;

  @IsNumber()
  price: number;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  picture?: string;
}
