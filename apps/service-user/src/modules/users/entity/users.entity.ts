import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@app/orm';

@Entity({
  name: 'users',
})
export class User extends BaseEntity {
  @Column({
    unique: true,
    type: 'varchar',
    length: 100,
  })
  email: string;

  @Column({ type: 'varchar', length: 15 })
  mobile: string;

  @Column({ type: 'varchar', length: 50 })
  firstName: string;

  @Column({ type: 'varchar', length: 50 })
  lastName: string;
}
