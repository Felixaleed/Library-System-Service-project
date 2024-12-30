/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule for environment variables
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    // Load environment variables
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration available globally
      envFilePath: '.env', // Specifies the environment file location
    }),
    // Connect to MongoDB using the DATABASE_URL from the .env file
    MongooseModule.forRoot(process.env.DATABASE_URL),
    ProfileModule, // Import ProfileModule
  ],
  controllers: [AppController], // Application-level controllers
  providers: [AppService], // Application-level services
})
export class AppModule {}
