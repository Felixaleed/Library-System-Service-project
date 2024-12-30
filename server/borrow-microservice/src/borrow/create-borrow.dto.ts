import { IsString, IsDate, IsOptional } from 'class-validator';

export class CreateBorrowDto {
  @IsString()
  bookId: string;

  @IsString()
  userId: string;
}
