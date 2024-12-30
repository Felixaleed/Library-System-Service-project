import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BorrowSchema } from './borrow.model';
import { BorrowService } from './borrow.service';
import { BorrowController } from './borrow.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Borrow', schema: BorrowSchema }])],
  controllers: [BorrowController],
  providers: [BorrowService],
})
export class BorrowModule {}