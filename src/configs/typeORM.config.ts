import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as process from 'node:process';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.HOST || 'localhost',
  port: +process.env.PORT,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
