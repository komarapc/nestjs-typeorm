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

import { UnitItemsEntity } from './unit-items.entity';

@Entity('unit_conversions')
export class UnitConversionEntity {
  @PrimaryColumn({ length: 36 })
  id: string;
  @Column({ length: 36 })
  from_unit_id: string;
  @Column({ length: 36 })
  to_unit_id: string;
  @Column({ type: 'decimal', precision: 10, scale: 4 })
  conversion_factor: number;
  @Column({ type: 'decimal', precision: 10, scale: 4 })
  conversion_factor_inverse: number;
  @CreateDateColumn({ type: 'timestamptz' })
  created_at?: Date;
  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updated_at?: Date;
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deleted_at?: Date;

  @ManyToOne(() => UnitItemsEntity, (r) => r.unit_conversion_from)
  @JoinColumn({ name: 'from_unit_id' })
  form_unit?: UnitItemsEntity;
  @ManyToOne(() => UnitItemsEntity, (r) => r.unit_conversion_to)
  @JoinColumn({ name: 'to_unit_id' })
  to_unit?: UnitItemsEntity;
}
