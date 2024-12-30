/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './book.model';
import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateBookDto } from './book.dto';
import { ValidationPipe } from '@nestjs/common';
@Controller('books') // Update controller path to 'books'
export class BookController {
  constructor(private readonly bookService: BookService) {}

 @Post()
async create(
  @Body(new ValidationPipe()) createBookDto: CreateBookDto,
): Promise<Book> {
  return this.bookService.create(createBookDto);
}


  @Get()
  async findAll(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Book> {
    return this.bookService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateBookDto: CreateBookDto,
  ): Promise<Book> {
    return this.bookService.update(id, updateBookDto);
  }
  @Delete(':id')
async remove(@Param('id') id: string): Promise<any> {
    return this.bookService.delete(id);
}

  
}