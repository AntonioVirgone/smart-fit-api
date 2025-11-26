import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateWorkoutByPlanCodeDto } from './dto/create-workout-by-plan-code.dto';

@ApiTags('Workout')
@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  /*
  @UseGuards(JwtAuthGuard)
  @Post(':customerId/user')
  async assign(
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
  */

  @Post()
  @ApiOperation({ summary: 'Save workout with plans' })
  async create(@Body() createWorkoutByPlanCode: CreateWorkoutByPlanCodeDto) {
    return await this.workoutService.createWorkoutByPlanCode(
      createWorkoutByPlanCode,
    );
  }

  @Get()
  findAll() {
    return this.workoutService.findAll();
  }

  @Delete()
  @ApiOperation({ summary: 'Delete all workouts' })
  async delete() {
    return await this.workoutService.removeAll();
  }
}
