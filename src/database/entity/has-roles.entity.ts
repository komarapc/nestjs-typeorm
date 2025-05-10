import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('has_roles')
export class HasRolesEntity {
  @PrimaryColumn({ length: 36 })
  id: string;
  @Column({ length: 36 })
  role_id: string;
  @Column({ length: 36 })
  user_id: string;
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updated_at: Date;
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deleted_at?: Date;
}
