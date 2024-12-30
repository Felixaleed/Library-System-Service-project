import { IsString, IsOptional, IsDate } from 'class-validator';

export class UpdateBorrowDto {
  @IsOptional()
  @IsDate()
  returnDate?: Date;

  @IsOptional()
  @IsString()
  status?: 'borrowed' | 'returned';
}
