import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();
console.log('This is DirName: ', __dirname);

const dataSource = (): DataSource => {
  return new DataSource({
    type: 'postgres',
    host: process.env.DATA_BASE_HOST,
    port: parseInt(process.env.DATA_BASE_PORT),
    username: process.env.DATA_BASE_USER_NAME,
    password: process.env.DATA_BASE_PASSWORD,
    logging: true,
    database: process.env.DATA_BASE_NAME,
    entities: [__dirname + '/../../../../**/*entity{.ts,.js}'],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  });
};

export const returnDataSource = dataSource();
