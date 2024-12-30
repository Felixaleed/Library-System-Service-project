/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BookController } from './book.controller'; // Update controller name
import { BookService } from './book.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from './book.model'; // Import the schema

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]), // Provide BookModel
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}