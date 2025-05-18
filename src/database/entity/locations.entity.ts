import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('loctions')
export class LocationsEntity {
  @PrimaryColumn({ length: 36 })
  id: string;
  @Column({ length: 36 })
  site_id: string;
  @Column()
  name: string;
  @Column({ nullable: true })
  description: string;
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updated_at?: Date;
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deleted_at?: Date;
}
