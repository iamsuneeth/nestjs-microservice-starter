import { Column, BaseEntity } from 'typeorm';

export class ServiceGroupMap extends BaseEntity {
  @Column({ type: 'uuid' })
  groupId: string;

  @Column({ type: 'uuid' })
  serviceId: string;
}
