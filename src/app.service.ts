import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book, BorrowingRecord, User } from './app.schema';
import { Repository } from 'typeorm';
import { BorrowBookRequestBody } from './app.type';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(BorrowingRecord)
    private readonly recordRepository: Repository<BorrowingRecord>,
  ) {}
  async getBorrowedBook(borrowed_id: string): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { id: borrowed_id },
    });

    return book;
  }

  async borrowBook(borrowingOptions: BorrowBookRequestBody): Promise<void> {
    const response = await this.bookRepository.update(
      { id: borrowingOptions.bookId },
      { is_available: false },
    );

    await this.recordRepository.save({
      user_id: borrowingOptions.userId,
      book_id: borrowingOptions.bookId,
      return_date: borrowingOptions.returnDate,
    });

    if (response.affected === 0) {
      throw new Error('Book not found');
    }
  }

  async getBorrowedRecord(userId: string): Promise<BorrowingRecord[]> {
    const allBorrowedRecords = await this.recordRepository.find({
      where: { user_id: userId },
    });
    return allBorrowedRecords;
  }

  async searchBook(query: Book): Promise<Book[]> {
    const allBooks = await this.bookRepository.find({
      where: {
        title: query.title,
        author: query.author,
        published_date: query.published_date,
        genre: query.genre,
        rating: query.rating,
        is_available: query.is_available,
      },
    });
    return allBooks;
  }
}
