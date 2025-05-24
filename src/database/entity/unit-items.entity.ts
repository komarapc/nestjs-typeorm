import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UnitConversionEntity } from './unit-conversion.entity';

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

  @ManyToOne(() => UnitConversionEntity, (r) => r.from_unit)
  unit_conversion_from?: UnitConversionEntity;
  @ManyToOne(() => UnitConversionEntity, (r) => r.to_unit)
  unit_conversion_to?: UnitConversionEntity;
}
