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

import { AddressEntity } from './address.entity';
import { AddressProvincesEntity } from './address-province.entity';
import { AddressSubdistrictEntity } from './address-subdistrict.entity';

@Entity('address_regencies')
export class AddressRegencyEntity {
  @PrimaryColumn({ length: 36 })
  id: string;
  @Column()
  province_code: string;
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

  @ManyToOne(() => AddressProvincesEntity, (r) => r.regencies, {
    nullable: true,
  })
  @JoinColumn({ name: 'province_code', referencedColumnName: 'code' })
  province?: AddressProvincesEntity;

  @OneToMany(() => AddressSubdistrictEntity, (r) => r.regency)
  subdistricts?: AddressSubdistrictEntity[];

  @OneToMany(() => AddressEntity, (r) => r.regency)
  address?: AddressEntity[];
}
