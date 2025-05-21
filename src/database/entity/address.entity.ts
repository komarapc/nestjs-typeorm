import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AddressProvincesEntity } from './address-province.entity';
import { AddressRegencyEntity } from './address-regency.entity';
import { AddressSubdistrictEntity } from './address-subdistrict.entity';
import { AddressVillagesEntity } from './address-villages.entity';
import { SitesEntity } from './sites.entity';

@Entity('address')
export class AddressEntity {
  @PrimaryColumn({ length: 36 })
  id: string;
  @Column({ length: 36, unique: true })
  ref_id: string;
  @Column({ length: 36 })
  province_id: string;
  @Column({ length: 36 })
  regency_id: string;
  @Column({ length: 36 })
  subdistrict_id: string;
  @Column({ length: 36 })
  village_id: string;
  @Column({ type: 'text', nullable: true })
  text_address: string;
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updated_at?: Date;
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deleted_at?: Date;

  @ManyToOne(() => AddressProvincesEntity, (r) => r.address)
  @JoinColumn({ name: 'province_id' })
  province: AddressProvincesEntity;
  @ManyToOne(() => AddressRegencyEntity, (r) => r.address)
  @JoinColumn({ name: 'regency_id' })
  regency: AddressRegencyEntity;
  @ManyToOne(() => AddressSubdistrictEntity, (r) => r.address)
  @JoinColumn({ name: 'subdistrict_id' })
  subdistrict: AddressSubdistrictEntity;
  @ManyToOne(() => AddressVillagesEntity, (r) => r.address)
  @JoinColumn({ name: 'village_id' })
  village: AddressVillagesEntity;

  @OneToOne(() => SitesEntity, (r) => r.address, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'ref_id' })
  has_site: SitesEntity;
}
