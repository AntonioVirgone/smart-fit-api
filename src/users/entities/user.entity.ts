import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, default: 'xxx' })
  customerId: string;

  @Column({ type: 'varchar', length: 255 })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 50, default: 'CONSUMER' })
  type: string;

  @Column({ type: 'text', nullable: true })
  refreshToken?: string | null;

  @Column({ type: 'varchar', length: 255 })
  codeValidator?: string | null;

  @Column({ type: 'varchar', length: 255, default: 'INACTIVE' })
  status?: string;

  @CreateDateColumn()
  created_at: Date;
}
