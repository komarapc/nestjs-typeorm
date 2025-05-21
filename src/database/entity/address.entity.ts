import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('address')
export class AddressEntity {
  @PrimaryColumn({ length: 36 })
  id: string;
  @Column({ length: 36 })
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
}
