import { DataSource } from 'typeorm';
import { AppDataSource } from '../data-source';
import { LanguageSeed } from './language.seed';

AppDataSource.initialize()
  .then(async (dataSource: DataSource) => {
    const seeder = new LanguageSeed();
    await seeder.run(dataSource);
    console.log('Seed complete!');
    await dataSource.destroy();
  })
  .catch((error) => console.log(error));
