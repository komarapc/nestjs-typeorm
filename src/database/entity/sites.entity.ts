import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { LocationsEntity } from './locations.entity';

@Entity('sites')
export class SitesEntity {
  @PrimaryColumn({ length: 36 })
  id: string;
  @Column()
  name: string;
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updated_at?: Date;
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deleted_at?: Date;

  @OneToMany(() => LocationsEntity, (r) => r.site, {
    cascade: true,
    onDelete: 'RESTRICT',
  })
  locations: LocationsEntity[];
}
