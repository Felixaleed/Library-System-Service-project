/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import * as dotenv from 'dotenv'; // Import dotenv
dotenv.config();


@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL),
    BookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
