import { Column, PrimaryColumn } from 'typeorm';

export class ServiceGroup {
  @PrimaryColumn('string', {
    length: '100',
  })
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 300 })
  description: string;
}
