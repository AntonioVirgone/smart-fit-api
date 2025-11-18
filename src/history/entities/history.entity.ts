import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('history')
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  customerId: string;

  @Column({ type: 'json', nullable: true })
  json_data: any;

  @Column({ type: 'varchar', length: 255, nullable: true })
  filename: string;

  @Column({ type: 'int', default: 0 })
  data_size: number;

  @CreateDateColumn()
  created_at: Date;

  @Column({ type: 'varchar', length: 50, default: 'pending' })
  status: string;
}
