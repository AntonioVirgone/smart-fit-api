import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Day } from './day.entity';

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column() name: string;
  @Column() description: string;
  @Column() imageName: string;
  @Column() muscleGroup: string;

  @Column("text", { array: true })
  instructions: string[];

  @ManyToOne(() => Day, (day) => day.exercises, { onDelete: 'CASCADE' })
  day: Day;
}
