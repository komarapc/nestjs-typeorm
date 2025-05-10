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

@Entity('users')
export class UserEntity {
  @PrimaryColumn({ length: 36 })
  id: string;
  @Column()
  name: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @CreateDateColumn({ type: 'timestamptz' })
  created_at?: Date;
  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updated_at?: Date;
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deleted_at?: Date;

  @OneToMany(() => HasRolesEntity, (r) => r.user, {
    cascade: true,
    onDelete: 'RESTRICT',
  })
  has_roles?: HasRolesEntity[];
}
