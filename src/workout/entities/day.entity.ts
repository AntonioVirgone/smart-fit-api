import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Workout } from './workout.entity';
import { Exercise } from './exercise.entity';

@Entity()
export class Day {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Workout, (workout) => workout.days, { onDelete: 'CASCADE' })
  workout: Workout;

  @OneToMany(() => Exercise, (exercise) => exercise.day, {
    cascade: true,
    eager: true,
  })
  exercises: Exercise[];
}
