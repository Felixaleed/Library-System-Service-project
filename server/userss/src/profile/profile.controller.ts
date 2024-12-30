/* eslint-disable prettier/prettier */
import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { ProfileService } from './profile.service';
  import { Profile } from './profile.model';
  import { CreateUserDto } from './profile.dto';
  
  @Controller('profile')
  export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}
  
    @Post()
    async create(@Body() createProfileDto: CreateUserDto): Promise<Profile> {
      try {
        return await this.profileService.create(createProfileDto);
      } catch (error) {
        if (error.message.includes('Duplicate')) {
          throw new HttpException(error.message, HttpStatus.CONFLICT);
        }
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
    
    @Get()
    async findAll(): Promise<Profile[]> {
      return this.profileService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Profile> {
      try {
        return await this.profileService.findOne(id);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
    }
  
    @Put(':id')
    async update(
      @Param('id') id: string,
      @Body() updateProfileDto: CreateUserDto,
    ): Promise<Profile> {
      try {
        return await this.profileService.update(id, updateProfileDto);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<{ deletedCount?: number }> {
      try {
        return await this.profileService.delete(id);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
    }
  }
  