import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('workout')
@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Post('exercise')
  @ApiOperation({ summary: 'Create exercise' })
  async createPlane(@Body() createExercise: CreateExerciseDto) {
    return this.workoutService.createExercise(createExercise);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':customerId/user')
  async create(
    @Param('customerId') customerId: string,
    @Body() createWorkoutDto: CreateWorkoutDto,
  ) {
    return await this.workoutService.create(customerId, createWorkoutDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':customerId/user')
  async find(@Param('customerId') customerId: string) {
    return await this.workoutService.findByCustomerId(customerId);
  }

  @Get()
  findAll() {
    return this.workoutService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workoutService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkoutDto: UpdateWorkoutDto) {
    return this.workoutService.update(+id, updateWorkoutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workoutService.remove(+id);
  }
}
