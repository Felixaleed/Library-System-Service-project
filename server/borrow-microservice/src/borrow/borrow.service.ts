import { Injectable ,InternalServerErrorException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Borrow } from './borrow.model';
import { CreateBorrowDto } from './create-borrow.dto';
import { UpdateBorrowDto } from './update-borrow.dto';

@Injectable()
export class BorrowService {
  constructor(@InjectModel('Borrow') private readonly borrowModel: Model<Borrow>) {}

  async create(createBorrowDto: CreateBorrowDto): Promise<Borrow> {
    const borrow = new this.borrowModel(createBorrowDto);
  
    try {
      return await borrow.save(); // Save the borrow entry to the database
    } catch (error) {
      console.error('Error saving borrow to DB:', error); // Log any database errors
      throw new InternalServerErrorException('Failed to save borrow record');
    }
  }
  

  async findAll(): Promise<Borrow[]> {
    return await this.borrowModel.find().exec();
  }

  async findOne(id: string): Promise<Borrow> {
    return await this.borrowModel.findById(id).exec();
  }

  async update(id: string, updateBorrowDto: UpdateBorrowDto): Promise<Borrow> {
    return await this.borrowModel.findByIdAndUpdate(id, updateBorrowDto, { new: true }).exec();
  }

  async remove(id: string): Promise<{ deletedCount?: number }> {
    return await this.borrowModel.deleteOne({ _id: id }).exec();
  }
}
