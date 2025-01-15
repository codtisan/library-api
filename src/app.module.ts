import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book, BorrowingRecord, User } from './app.schema';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'admin',
      username: 'admin',
      entities: [User, Book, BorrowingRecord],
      database: 'postgres',
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([User, Book, BorrowingRecord]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
