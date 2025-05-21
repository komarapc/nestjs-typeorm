import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AddressEntity } from './address.entity';
import { AddressRegencyEntity } from './address-regency.entity';

@Entity('address_provinces')
export class AddressProvincesEntity {
  @PrimaryColumn({ length: 36 })
  id: string;
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

  @OneToMany(() => AddressRegencyEntity, (r) => r.province)
  regencies: AddressRegencyEntity[];

  @OneToMany(() => AddressEntity, (r) => r.province)
  address: AddressEntity[];
}
