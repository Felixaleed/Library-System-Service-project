/* eslint-disable prettier/prettier */
import { Schema, Document, model } from 'mongoose';

export interface Book extends Document {
  readonly id: string; // Custom field
  readonly title: string;
  readonly author: string;
  readonly publishYear: number;
  readonly price: number;
  readonly description: string;
  readonly picture: string;
}
 
export const BookSchema = new Schema(
  {
    id: {
      type: String, // Custom field for your internal use
      required: true,
      unique: true, // Ensure it's unique if required
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      validate: {
        validator: (value: number) => value >= 0,
        message: 'Price must be a non-negative number.',
      },
    },
    description: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      default: 'default-image-url.jpg', // Optional default image URL
    },
  },
  { timestamps: true }
);

// Index for better query performance
BookSchema.index({ title: 1 });
BookSchema.index({ author: 1 });

export const BookModel = model<Book>('Book', BookSchema);
