import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AddressEntity } from './address.entity';
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

  @OneToOne(() => AddressEntity, (r) => r.has_site, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'id', referencedColumnName: 'ref_id' })
  address?: AddressEntity;
}
