import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { HasRolesEntity } from './has-roles.entity';
import { PermissionsEntity } from './permissions.entity';

@Entity('roles')
export class RolesEntity {
  @PrimaryColumn({ length: 36 })
  id: string;
  @Column({ length: 10 })
  code: string;
  @Column()
  name: string;
  @CreateDateColumn({ type: 'timestamptz' })
  created_at?: Date;
  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updated_at?: Date;
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deleted_at?: Date;

  @OneToMany(() => HasRolesEntity, (r) => r.role, {
    cascade: true,
    onDelete: 'RESTRICT',
  })
  has_roles?: HasRolesEntity[];

  @OneToMany(() => PermissionsEntity, (r) => r.role, {
    cascade: true,
    onDelete: 'RESTRICT',
  })
  has_permissions?: PermissionsEntity[];
}
