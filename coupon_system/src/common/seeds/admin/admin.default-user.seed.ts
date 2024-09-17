import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { USER_TYPE } from 'src/common/constants/user-type/user.type.constant';
import { returnDataSource } from 'src/common/database/postgres/data-source/data-source';
import { AdminEntity } from 'src/modules/admin/enitity/admin.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
dotenv.config();

export class AdminSeed implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(AdminEntity);
    const password = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    const existingAdmin = await repository.findOne({
      where: { email: 'admin@gmail.com' },
    });

    if (existingAdmin) {
      return;
    }
    await repository.insert({
      email: 'admin@gmail.com',
      password: password,
      role: USER_TYPE.ADMIN,
    });
  }
}

returnDataSource
  .initialize()
  .then(async (dataSource: DataSource) => {
    const seeder = new AdminSeed();
    await seeder.run(dataSource);
    console.log('Seed complete!');
    await dataSource.destroy();
  })
  .catch((error) => console.log(error));
