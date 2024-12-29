import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(
    email: string,
    password: string,
    confirmPassword: string,
    role: string = 'client', // Default only if `role` is undefined
    username?: string,
  ) {
    try {
      console.log('Received data in AuthService:', { email, password, confirmPassword, role, username });
  
      if (password !== confirmPassword) {
        throw new BadRequestException('Passwords do not match');
      }
  
      const existingUser = await this.userModel.findOne({ email });
      if (existingUser) {
        throw new BadRequestException('Email already registered');
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const userPayload = {
        email,
        password: hashedPassword,
        role, // Use the provided role
        ...(username ? { username } : {}),
      };
  
      console.log('Final user payload before saving:', userPayload);
  
      const newUser = new this.userModel(userPayload);
      const savedUser = await newUser.save();
  
      console.log('Saved User:', savedUser); // Ensure the saved user has the correct role
      return savedUser;
    } catch (error) {
      console.error('Error during registration:', error);
      throw new InternalServerErrorException('An error occurred while registering');
    }
  }
  
  

  async validateUser(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
  
    if (!user) {
      console.log('User not found');
      return null;
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid password');
      return null;
    }
  
    console.log('Validated User:', user); // Ensure `role` is in the user object
    return user;
  }
  
  
  async login(user: any) {
    const payload = { email: user.email, sub: user._id, role: user.role };
  
    console.log('Generated Payload:', payload); // Debug log
    return {
      access_token: this.jwtService.sign(payload),
      role: user.role, // Explicitly return the role
    };
  }
  
  
  
}
