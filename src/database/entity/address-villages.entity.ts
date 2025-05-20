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

import { AddressSubdistrictEntity } from './address-subdistrict.entity';

@Entity('address_villages')
export class AddressVillagesEntity {
  @PrimaryColumn({ length: 36 })
  id: string;
  @Column()
  subdistrict_code: string;
  @Column({ unique: true })
  code: string;
  @Column()
  name: string;
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updated_at?: Date;
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deleted_at?: Date;

  @ManyToOne(() => AddressSubdistrictEntity, (r) => r.villages)
  @JoinColumn({ name: 'subdistrict_code', referencedColumnName: 'code' })
  subdistrict?: AddressSubdistrictEntity;
}
