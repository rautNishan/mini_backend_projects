import { DatabaseBaseEntity } from 'src/common/database/base/entity/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'blogs' })
export class BlogEntity extends DatabaseBaseEntity {
  @Column({ name: 'title', type: 'varchar', length: 100 })
  title: string;

  @Column({ name: 'description', type: 'text' })
  description: string;

  @Column({ name: 'primary_language', type: 'varchar', length: 100 })
  primaryLanguage: string;
}
