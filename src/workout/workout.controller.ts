import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateDayByExerciseCode } from './dto/create-day-by-excercise-code.dto';

@ApiTags('workout')
@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Post('exercise')
  @ApiOperation({ summary: 'Create exercise' })
  async createPlane(@Body() createExercise: CreateExerciseDto) {
    return await this.workoutService.createExercise(createExercise);
  }

  @Post('day')
  @ApiOperation({ summary: 'Create day' })
  async day(@Body() createDayDto: CreateDayByExerciseCode) {
    return await this.workoutService.createDayByExCode(createDayDto);
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
