import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { SitesEntity } from './sites.entity';

@Entity('locations')
export class LocationsEntity {
  @PrimaryColumn({ length: 36 })
  id: string;
  @Column({ length: 36 })
  site_id: string;
  @Column()
  name: string;
  @Column({ nullable: true })
  description: string;
  @Column({ length: 36, nullable: true })
  parent_id: string;
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updated_at?: Date;
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deleted_at?: Date;

  @ManyToOne(() => SitesEntity, (r) => r.locations)
  @JoinColumn({ name: 'site_id' })
  site: SitesEntity;

  // self join
  @ManyToOne(() => LocationsEntity, (r) => r.id, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'parent_id' })
  parent: LocationsEntity;
}
