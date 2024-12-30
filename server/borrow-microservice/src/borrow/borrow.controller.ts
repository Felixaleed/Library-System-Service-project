import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
  } from '@nestjs/common';
  import { BorrowService } from './borrow.service';
  import { CreateBorrowDto } from './create-borrow.dto';
  import { UpdateBorrowDto } from './update-borrow.dto';
  
  @Controller('borrow')
  export class BorrowController {
    constructor(private readonly borrowService: BorrowService) {}
  
    @Post()
    async create(@Body() createBorrowDto: CreateBorrowDto) {
      console.log('Incoming Borrow Request:', createBorrowDto); // Debug log
      return this.borrowService.create(createBorrowDto);
    }
    
  
    @Get()
    async findAll() {
      return this.borrowService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      return this.borrowService.findOne(id);
    }
  
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateBorrowDto: UpdateBorrowDto) {
      return this.borrowService.update(id, updateBorrowDto);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string) {
      return this.borrowService.remove(id);
    }
  }
  