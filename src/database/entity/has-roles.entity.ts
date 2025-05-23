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

import { RolesEntity } from './roles.entity';
import { UserEntity } from './user.entity';

@Entity('has_roles')
export class HasRolesEntity {
  @PrimaryColumn({ length: 36 })
  id: string;
  @Column({ length: 36 })
  role_id: string;
  @Column({ length: 36 })
  user_id: string;
  @CreateDateColumn({ type: 'timestamptz' })
  created_at?: Date;
  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updated_at?: Date;
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deleted_at?: Date;

  @ManyToOne(() => RolesEntity, (r) => r.has_roles)
  @JoinColumn({ name: 'role_id' })
  role?: RolesEntity;
  @ManyToOne(() => UserEntity, (r) => r.has_roles)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;
}
