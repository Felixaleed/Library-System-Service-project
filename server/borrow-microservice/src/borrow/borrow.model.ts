import { Schema, Document, model } from 'mongoose';

export interface Borrow extends Document {
  bookId: string; // Reference to the book
  userId: string; // Reference to the user
  borrowDate: Date;
  returnDate?: Date; // Nullable until the book is returned
  status: 'borrowed' | 'returned'; // Track the status
}

export const BorrowSchema = new Schema<Borrow>(
  {
    bookId: { type: String, required: true },
    userId: { type: String, required: true },
    borrowDate: { type: Date, default: Date.now },
    returnDate: { type: Date },
    status: { type: String, enum: ['borrowed', 'returned'], default: 'borrowed' },
  },
  { timestamps: true },
);

export const BorrowModel = model<Borrow>('Borrow', BorrowSchema);
