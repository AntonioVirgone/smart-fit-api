import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Workout } from '../../workout/entities/workout.entity';
import { Exercise } from '../../exercise/entities/exercise.entity';

@Entity()
export class Plan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Workout, (workout) => workout.plans, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  workout: Workout;

  @OneToMany(() => Exercise, (exercise) => exercise.plan, {
    eager: true,
  })
  exercises: Exercise[];
}
