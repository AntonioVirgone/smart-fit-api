import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Plan } from '../../plan/entities/plan.entity';

@Entity()
export class Workout {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string;

  @OneToMany(() => Plan, (plan) => plan.workout, {
    eager: true,
  })
  plans: Plan[];
}
