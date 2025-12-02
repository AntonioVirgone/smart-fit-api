import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Plan } from '../../plan/entities/plan.entity';

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  trainerCode: string;
  @Column() name: string;
  @Column() description: string;
  @Column() imageName: string;
  @Column() muscleGroup: string;
  @Column({ type: 'int', default: 0 }) sets: number;
  @Column({ type: 'int', default: 0 }) repetitions: number;
  @Column({ type: 'int', default: 0 }) recovery: number;

  @Column('text', { array: true })
  instructions: string[];

  @ManyToOne(() => Plan, (plan) => plan.exercises, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  plan: Plan;
}
