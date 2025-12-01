// customer_workout.entity.ts
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from '../../customers/entities/customer.entity';
import { Workout } from '../../workout/entities/workout.entity';

@Entity('customer_workout')
export class CustomerWorkout {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Customer, { nullable: false, onDelete: 'RESTRICT' })
  customer: Customer;

  @ManyToOne(() => Workout, { nullable: false, onDelete: 'RESTRICT' })
  workout: Workout;
}
