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

  @ManyToOne(() => AddressSubdistrictEntity, (r) => r.villages, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'subdistrict_code', referencedColumnName: 'code' })
  subdistrict?: AddressSubdistrictEntity;
  @OneToMany(() => AddressEntity, (r) => r.village)
  address?: AddressEntity[];
}
