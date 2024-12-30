/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile } from './profile.model';
import { CreateUserDto } from './profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel('Profile') private readonly profileModel: Model<Profile>,
  ) {}

  async create(profileDto: CreateUserDto): Promise<Profile> {
    try {
      const newProfile = new this.profileModel(profileDto);
      return await newProfile.save();
    } catch (error) {
      if (error.code === 11000) {
        // Handle duplicate key error
        const duplicateField = Object.keys(error.keyValue)[0];
        throw new Error(`Duplicate ${duplicateField}: ${error.keyValue[duplicateField]}`);
      }
      throw new Error('Error creating profile: ' + error.message);
    }
  }
  
  

  async findAll(): Promise<Profile[]> {
    return await this.profileModel.find().exec();
  }

  async findOne(id: string): Promise<Profile> {
    const profile = await this.profileModel.findById(id).exec();
    if (!profile) {
      throw new Error('Profile not found');
    }
    return profile;
  }

  async update(id: string, profileDto: CreateUserDto): Promise<Profile> {
    const updatedProfile = await this.profileModel
      .findByIdAndUpdate(id, profileDto, { new: true })
      .exec();
    if (!updatedProfile) {
      throw new Error('Profile not found');
    }
    return updatedProfile;
  }

  async delete(id: string): Promise<{ deletedCount?: number }> {
    return await this.profileModel.deleteOne({ _id: id }).exec();
  }
}
