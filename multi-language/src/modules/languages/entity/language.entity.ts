import { DatabaseBaseEntity } from 'src/common/database/base/entity/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'languages' })
export class LanguageEntity extends DatabaseBaseEntity {
  @Column({ name: 'language', type: 'varchar', length: 100 })
  language: string;
  @Column({ name: 'language_code', type: 'varchar', length: 100 })
  languageCode: string;
  @Column({ name: 'native-name', type: 'varchar', length: 100 })
  nativeName: string;
}
