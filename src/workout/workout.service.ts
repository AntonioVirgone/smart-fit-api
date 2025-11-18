import {
  Get,
  Injectable,
  NotFoundException,
  Param,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workout } from './entities/workout.entity';
import { v4 as uuidv4 } from 'uuid';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Injectable()
export class WorkoutService {
  constructor(
    @InjectRepository(Workout)
    private workoutRepository: Repository<Workout>,
  ) {}

  async create(customerId: string, dto: CreateWorkoutDto): Promise<Workout> {
    const workout = this.workoutRepository.create({
      id: uuidv4(),
      customerId: customerId,
      name: dto.name,
      days: dto.days.map((day) => ({
        name: day.name,
        exercises: day.exercises.map((ex) => ({
          name: ex.name,
          description: ex.description,
          imageName: ex.imageName,
          muscleGroup: ex.muscleGroup,
          instructions: ex.instructions,
        })),
      })),
    });

    return await this.workoutRepository.save(workout);
  }

  async findByCustomerId(customerId: string): Promise<Workout> {
    const workout = await this.workoutRepository.findOne({
      where: { customerId },
    });

    if (!workout) {
      throw new NotFoundException();
    }
    return workout;
  }

  async findAll() {
    return await this.workoutRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} workout`;
  }

  update(id: number, updateWorkoutDto: UpdateWorkoutDto) {
    return `This action updates a #${id} workout`;
  }

  remove(id: number) {
    return `This action removes a #${id} workout`;
  }
}
