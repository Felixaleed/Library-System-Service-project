/* eslint-disable prettier/prettier */
import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Book } from './book.model';
import { CreateBookDto } from './book.dto';

@Injectable()
export class BookService {
  constructor(@Inject('BookModel') private readonly bookModel: Model<Book>) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const newBook = new this.bookModel(createBookDto);
    return await newBook.save();
  }

  async findAll(): Promise<Book[]> {
    return await this.bookModel.find().exec();
  }

  async findOne(id: string): Promise<Book> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ObjectId format');
    }
    return await this.bookModel.findById(new Types.ObjectId(id)).exec();
  }

  async update(id: string, updateBookDto: Partial<CreateBookDto>): Promise<Book> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ObjectId format');
    }
  
    const updatedBook = await this.bookModel
      .findByIdAndUpdate(new Types.ObjectId(id), updateBookDto, { new: true })
      .exec();
  
    if (!updatedBook) {
      throw new BadRequestException('Book not found');
    }
  
    return updatedBook;
  }
  
  async delete(id: string): Promise<any> {
    console.log("Deleting book with ID:", id);
    if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid ObjectId format');
    }
    return await this.bookModel.deleteOne({ _id: new Types.ObjectId(id) }).exec();
}

}
