import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('unit_items')
export class UnitItemsEntity {
  @PrimaryColumn({ length: 36 })
  id: string;
  @Column()
  name: string;
  @Column()
  abbreviation: string;
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updated_at?: Date;
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deleted_at?: Date;
}
