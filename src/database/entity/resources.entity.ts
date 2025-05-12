import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { PermissionsEntity } from './permissions.entity';

@Entity('resources')
export class ResourceEntity {
  @PrimaryColumn({ length: 36 })
  id: string;
  @Column()
  name: string;
  @Column()
  path: string;
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updated_at: Date;
  @Column({ type: 'timestamptz', nullable: true })
  deleted_at: Date | null;

  @OneToMany(() => PermissionsEntity, (r) => r.resource, {
    cascade: true,
    onDelete: 'RESTRICT',
  })
  has_permissions?: PermissionsEntity[];
}
