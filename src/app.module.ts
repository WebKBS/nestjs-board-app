import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as process from 'node:process';
import { Board } from './boards/boards.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(), // 환경 변수 사용을 위한 모듈
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.USERNAME,
      database: process.env.DATABASE,
      entities: [Board],
      synchronize: true, // 개발 환경에서만 사용
    }),
    BoardsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
