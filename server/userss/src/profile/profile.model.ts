/* eslint-disable prettier/prettier */
import { Schema, Document, model } from 'mongoose';

export interface Profile extends Document {
  email: string;
  username: string;
  gender: string;
  role: string;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const ProfileSchema = new Schema<Profile>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true, // Ensures email is unique
      validate: {
        validator: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: 'Invalid email format.',
      },
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true, // Ensures username is unique
    },
    gender: {
      type: String,
      enum: ['Male', 'Female'],
      required: [true, 'Gender is required'],
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
    },
    avatar: {
      type: String,
      default: 'default-avatar-url.jpg',
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);




export const ProfileModel = model<Profile>('Profile', ProfileSchema);
