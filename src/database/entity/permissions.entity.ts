import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Action {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  OPTIONS = 'OPTIONS',
  HEAD = 'HEAD',
  ALL = 'ALL',
}

@Entity('permissions')
export class PermissionsEntity {
  @PrimaryColumn({ length: 36 })
  id: string;
  @Column({ length: 36 })
  role_id: string;
  @Column({ length: 36 })
  resource_id: string;
  @Column({ type: 'enum', enum: Action, array: true })
  action: Action[];
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updated_at: Date;
  @Column({ type: 'timestamptz', nullable: true })
  deleted_at: Date | null;
}
