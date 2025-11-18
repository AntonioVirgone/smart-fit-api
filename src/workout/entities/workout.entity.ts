import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Day } from './day.entity';

@Entity()
export class Workout {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  customerId: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string;

  @OneToMany(() => Day, (day) => day.workout, {
    cascade: true,
    eager: true,
  })
  days: Day[];
}
