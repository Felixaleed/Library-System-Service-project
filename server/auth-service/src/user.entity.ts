import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ unique: true, required: true })
  email: string; // Unique email address for the user

  @Prop({ required: true })
  password: string; // Hashed password

  @Prop({ default: 'user' }) // Default role: 'user'
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
