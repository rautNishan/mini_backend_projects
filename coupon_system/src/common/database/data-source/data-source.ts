import { DataSource } from 'typeorm';

export const dataSource = (): DataSource => {
  return new DataSource({
    type: 'postgres',
    host: process.env.DATA_BASE_HOST,
    port: parseInt(process.env.DATA_BASE_PORT),
    username: process.env.DATA_BASE_USER_NAME,
    password: process.env.DATA_BASE_PASSWORD,
    database: process.env.DATA_BASE_NAME,
    entities: [__dirname + '../../../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '../migrations/*{.ts,.js}'],
  });
};
