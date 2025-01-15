import { IsNotEmpty } from 'class-validator';

export class BorrowBookRequestBody {
  @IsNotEmpty()
  bookId: string;

  @IsNotEmpty()
  userId: string;

  returnDate?: Date;
}

export class SearchBookQuery {
  title?: string;
  author?: string;
  genre?: string;
  rating?: number;
  is_available?: boolean;
  published_date?: Date;
}
