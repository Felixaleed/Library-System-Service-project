/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileSchema} from './profile.model'; // Import the schema



@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Profile', schema: ProfileSchema }]), // Provide ItemModel
  ],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule {}
