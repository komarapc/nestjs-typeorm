import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AddressRegencyEntity } from './address-regency.entity';
import { AddressVillagesEntity } from './address-villages.entity';

@Entity('address_subdistricts')
export class AddressSubdistrictEntity {
  @PrimaryColumn({ length: 36 })
  id: string;
  @Column()
  regency_code: string;
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

  @ManyToOne(() => AddressRegencyEntity, (r) => r.subdistricts)
  @JoinColumn({ name: 'regency_code', referencedColumnName: 'code' })
  regency?: AddressRegencyEntity;

  @OneToMany(() => AddressVillagesEntity, (r) => r.subdistrict, {
    nullable: true,
  })
  villages?: AddressVillagesEntity[];
}
