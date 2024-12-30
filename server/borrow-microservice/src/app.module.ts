import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BorrowModule } from './borrow/borrow.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Automatically load environment variables
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'), // Use the MongoDB URL from .env
      }),
      inject: [ConfigService],
    }),
    BorrowModule,
  ],
})
export class AppModule {}
