import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('api')
export class AppController {
  constructor(
    @Inject('BOOK_SERVICE') private readonly bookService: ClientProxy,
    @Inject('BORROW_SERVICE') private readonly borrowService: ClientProxy,
  ) {}

  // Forward GET /books to Book Microservice
  @Get('books')
  async getBooks() {
    return this.bookService.send({ cmd: 'get_books' }, {}); // RPC pattern
  }

  // Forward POST /borrow to Borrow Microservice
  @Post('borrow')
  async borrowBook(@Body() borrowDetails: any) {
    return this.borrowService.send({ cmd: 'borrow_book' }, borrowDetails);
  }
}
