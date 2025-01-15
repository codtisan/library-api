import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  Index,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  registered_date: Date;
}

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  author: string;

  @Column({ nullable: false })
  published_date: Date;

  @Column('boolean', { default: true })
  is_available: boolean;

  @Column({ nullable: true })
  genre: string;

  @Column({ nullable: true })
  rating: number;
}

@Entity()
export class BorrowingRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @OneToOne(() => User, (user) => user.id)
  user_id: string;

  @Index({ unique: true })
  @OneToOne(() => Book, (book) => book.id)
  book_id: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  borrow_date: Date;

  @Column({ nullable: true })
  return_date: Date;
}
