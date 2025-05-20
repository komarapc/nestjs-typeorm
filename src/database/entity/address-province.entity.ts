import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('address_provinces')
export class AddressProvinces {
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
}
