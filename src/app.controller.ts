import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { BorrowBookRequestBody } from './app.type';
import { Book, BorrowingRecord } from './app.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/borrow')
  async borrowBook(@Body() body: BorrowBookRequestBody): Promise<void> {
    console.log(body);
    return this.appService.borrowBook(body);
  }

  @Get('/borrowed/:borrowed_id')
  async getBorrowedBooks(
    @Param('borrowed_id') borrowedId: string,
  ): Promise<Book> {
    return this.appService.getBorrowedBook(borrowedId);
  }

  @Get('/record/:user_id')
  async getBorrowedRecordByUser(
    @Param('user_id') userId: string,
  ): Promise<BorrowingRecord[]> {
    return this.appService.getBorrowedRecord(userId);
  }

  @Get('/search')
  async searchBooksByUrl(@Query() query: Book): Promise<Book[]> {
    return this.appService.searchBook(query);
  }
}
